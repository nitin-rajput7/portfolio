# Nitin Rajput - Full Stack MERN Portfolio

A modern, responsive full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** portfolio application.

## 🚀 Key Features

- **Full MERN Stack Architecture**:
  - **MongoDB**: Persistent database storage for contact inquiries and dynamic projects.
  - **Express.js**: Clean REST API server with MVC architecture, request validation, error handling, and auto-seeding.
  - **React.js (React 19 + Vite)**: Modern frontend with reactive states, interactive category filtering, and live database viewer.
  - **Node.js**: Asynchronous JavaScript runtime environment.
- **Live Contact Inquiries API**: Submissions on the contact form are validated and saved directly into the MongoDB `messages` collection via `POST /api/contact`.
- **Live Database Inspector (Interviewer Demo)**: Built-in modal allowing visitors and interviewers to view and manage inquiries saved in MongoDB in real time.
- **Dynamic Projects with Category Filter**: Fetches projects dynamically from `GET /api/projects` with zero-config auto-seeding and category filtering (All, MERN Stack, React, JavaScript).
- **Comprehensive Interview Guide**: Complete plain-English explanation of the architecture and answers to top MERN interview questions in `MERN_EXPLANATION_GUIDE.md`.

---

## 💻 Running Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local Community Server running on `127.0.0.1:27017` or MongoDB Atlas URI in `server/.env`)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Fullstack Dev Server (Backend + Frontend concurrently)
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 4. Other Available Scripts
- `npm run server`: Run only the Express backend server
- `npm run client`: Run only the Vite React frontend
- `npm run seed`: Manually re-seed default projects into MongoDB
- `npm run build`: Generate production build bundle for frontend

---

## 📁 Architecture Overview

```text
├── server/                 # Express backend & MongoDB data models
│   ├── config/db.js        # Mongoose database connection
│   ├── controllers/        # Business logic (contactController, projectController)
│   ├── models/             # Mongoose schemas (Message, Project)
│   ├── routes/             # REST API routes (/api/contact, /api/projects)
│   ├── data/seedProjects.js# Initial project seed data
│   ├── .env                # Server environment variables
│   └── server.js           # Server entry point
├── src/                    # React 19 frontend
│   ├── components/         # Modular React components (Hero, Projects, Contact, Modal, etc.)
│   ├── data/               # Static fallback data
│   ├── App.jsx             # Main application layout
│   └── index.css           # Modern dark-mode styling & animations
└── MERN_EXPLANATION_GUIDE.md # Interview Q&A and architecture explanation guide
```

---

## 📖 Interview & Explanation Guide

For an in-depth, plain-English explanation of how this MERN project works under the hood and how to answer technical questions in interviews, please read:
👉 **[MERN_EXPLANATION_GUIDE.md](./MERN_EXPLANATION_GUIDE.md)**
