# LinkForge — URL Shortener

A full-stack URL Shortener using HTML/CSS/JavaScript + Node.js/Express + MongoDB.

## Features
- Long URL → short code
- Redirects `/s/:code` to the original URL
- MongoDB storage
- Indexed `shortCode` field for fast lookup
- Click counter
- Responsive animated developer/IT-themed background
- Copy-to-clipboard UI
- Basic URL validation

## Requirements
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

## Run
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env`
4. Set `MONGO_URI` if needed.
5. `npm start`
6. Open `http://localhost:5000`

The requested database password is included in `.env.example` as `dpusst123`.
For a real deployment, use a strong secret and environment variables instead of committing credentials.
