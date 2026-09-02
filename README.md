# Prismix Digital

A MERN website for Prismix Digital, a premier digital studio focused on website development, AI solutions, and digital marketing.

## Run locally

```bash
cd client && npm install && npm run dev
cd server && npm install && npm run dev
```

Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` for contact persistence. The frontend works without the API and shows a setup message when the API is unavailable.

The API includes Helmet security headers, a 10 KB JSON body limit, and a limit of 20 contact requests per IP every 15 minutes. Keep `.env` private and never commit database credentials.
