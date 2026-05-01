<p align="center">
  <img src="https://hr.gmu.edu/wp-content/uploads/2020/01/Mason-Logo.png" alt="George Mason University" width="220">
</p>

# Invisible CAPTCHA — Frontend

React app for the Invisible CAPTCHA Engine. The frontend renders the demo UI and **passively collects behavioral biometrics** — mouse movement and keystroke timing — then ships the data to the backend for human-vs-bot classification. No puzzles, no checkboxes, no images to click.

This is one of three repos in the senior design project. See the main project README: [RayQCodes/readme](https://github.com/RayQCodes/readme).

---

## What It Does

- Renders a sample interaction page (form, buttons, input fields) for users to interact with naturally.
- Collects **mouse movement** signals: cursor coordinates over time, velocity, trajectory.
- Collects **keystroke timing** signals: dwell time (how long a key is held) and flight time (delay between keys).
- Bundles the captured signals into a JSON payload and sends it to the Spring Boot backend.
- Displays the verdict returned from the backend (human / bot).

---

## Tech Stack

- **React** (JavaScript)
- **Plain CSS / CSS Modules** for styling
- **Fetch API** for backend communication

---

## Project Structure

The app lives in a nested folder:

```
frontend/
└── captcha-decider-frontend-master/
    └── captcha-decider-frontend-master/   <- run commands from here
        ├── public/
        ├── src/
        ├── package.json
        └── README.md
```

> All `npm` commands below should be run from the inner `captcha-decider-frontend-master/` folder.

---

## Getting Started

### Prerequisites
- **Node.js** 18 or higher ([download](https://nodejs.org/))
- **npm** (comes with Node)

### Install

```bash
cd captcha-decider-frontend-master/captcha-decider-frontend-master
npm install
```

### Run the Dev Server

If the project is **Create React App**:
```bash
npm start
```
Then open [http://localhost:3000](http://localhost:3000).

If the project is **Vite**:
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173).

> Not sure which one? Open `package.json` and look at the `"scripts"` section — if you see `"start": "react-scripts start"` it's CRA; if you see `"dev": "vite"` it's Vite.

### Build for Production

```bash
npm run build
```

The static build output is what gets deployed to the web server EC2 (served behind Nginx).

---

## Backend Connection

The frontend expects the backend to be reachable at the URL configured in the source. For local development, the backend should be running on `http://localhost:8080`. For production, it's served from the same EC2 instance behind Nginx, so the frontend hits a relative path.

If you need to point at a different backend, update the API base URL in the source (search the `src/` folder for `localhost:8080` or `fetch(`).

---

## Deployment

The production frontend is deployed alongside the backend on **EC2 #1 (Web Server)**:

```
+---------------------------------------+
|  EC2 #1 — Web Server                  |
|  Nginx -> Tomcat                      |
|    - React frontend (this repo)       |
|    - Spring Boot backend              |
+---------------------------------------+
```

Nginx serves the static React build and reverse-proxies `/api/*` requests to the Spring Boot backend on Tomcat.

---

## Related Repositories

- **Main project README:** [RayQCodes/readme](https://github.com/RayQCodes/readme)
- **Backend:** [RayQCodes/Backend](https://github.com/RayQCodes/Backend)
- **ML Model:** [RayQCodes/ML-Model](https://github.com/RayQCodes/ML-Model)

---

## Team

George Mason University — Senior Design Capstone CYSE 2026
Pragalv Bhattarai, Raymond Quan, Faizan Munir, Logan Breckenridge, Jeremiah Mccormick, Saipradhith Gudapati

**Sponsor:** Dr. MingKui Wei
**Mentor:** Dr. Jair Ferrari
