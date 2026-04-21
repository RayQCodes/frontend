# captcha-decider-frontend

React + Vite front-end for the captcha-decider server.

## Features
- Contact form that submits to `/api/v1/form`.
- Session cookie (`cds_session`) for correlating events and form requests.
- Heartbeat sender every 5s with mouse/keypress counts to `/api/v1/event`.
- Honeypot fields to catch simple bots.
- Captcha modal shown when backend returns `CAPTCHA`; resubmits with `captchaCompleted=true`.

## Getting started
1. Install Node.js (LTS) which provides `npm` or `pnpm`.
2. From this folder:
   - `npm install`
   - `npm run dev` (proxies `/api` to `http://localhost:8080`)
3. Build for production: `npm run build`.

If your backend runs on another host/port, edit `vite.config.js` proxy accordingly.
