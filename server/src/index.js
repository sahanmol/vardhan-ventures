import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import { body, validationResult } from 'express-validator'
import Contact from './models/Contact.js'

const app = express()
const port = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  }),
)
app.use(helmet())
app.use(express.json({ limit: '10kb' }))

app.use(
  '/api/contact',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many enquiries. Please try again later.' },
  }),
)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post(
  '/api/contact',
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid email is required'),
    body('phone')
      .optional({ values: 'falsy' })
      .trim()
      .isLength({ max: 30 })
      .withMessage('Phone number is too long'),
    body('service')
      .trim()
      .isLength({ min: 2, max: 80 })
      .withMessage('Service is required'),
    body('message')
      .trim()
      .isLength({ min: 10, max: 3000 })
      .withMessage('Message must be between 10 and 3000 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const lead = process.env.MONGODB_URI
        ? await Contact.create(req.body)
        : null
      res.status(201).json({ message: 'Inquiry received', id: lead?.id || null })
    } catch (error) {
      console.error('Contact submission failed:', error.message)
      res.status(500).json({ message: 'Could not save inquiry' })
    }
  },
)

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) =>
      console.error('MongoDB connection failed:', error.message),
    )
}

app.listen(port, () => {
  console.log(`Vardhan Ventures API listening on ${port}`)
})
