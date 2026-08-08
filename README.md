# 🚀 DevTinder

DevTinder is a production-ready developer networking platform that enables developers to discover, connect, and chat in real time. Built with the MERN Stack and deployed on AWS EC2 with secure JWT authentication, Socket.IO, Nginx, PM2, and HTTPS.

![React](https://img.shields.io/badge/React-19-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-black)
![AWS](https://img.shields.io/badge/AWS-EC2-orange)
![License](https://img.shields.io/badge/License-MIT-blue)


---

## 🌐 Live Demo

### Frontend
https://devtinder-sepia.vercel.app

### Backend API
https://api-devtinder.2bd.net

---

## ✨ Features

### 🔐 Authentication
- Secure Email & Password Authentication
- JWT Authentication
- HTTP-only Secure Cookies
- Protected Routes
- Logout Functionality

### 👤 Profile Management
- Create Developer Profile
- Edit Profile
- Update Password
- Upload Profile Photo
- Skills, Bio, Age & Gender

### ❤️ Developer Matching
- Infinite Developer Feed
- Pagination Support
- Interested / Ignore Requests
- Accept / Reject Requests
- Connection Management

### 💬 Real-Time Chat
- One-to-One Messaging
- Socket.IO
- Persistent Chat History
- Messages Stored in MongoDB

### 🚀 Production Deployment
- AWS EC2
- Nginx Reverse Proxy
- PM2 Process Manager
- HTTPS using Let's Encrypt
- Vercel Frontend
- Secure Cross-Origin Authentication
- Cookie-based Authentication

---

# 🛠 Tech Stack

| Layer | Technologies |
|--------|-------------|
| Frontend | React 19, Vite, React Router, Redux Toolkit, Axios, Tailwind CSS |
| Backend | Node.js, Express.js, JWT, bcrypt.js, Socket.IO |
| Database | MongoDB, Mongoose |
| Deployment | AWS EC2, Nginx, PM2, Vercel, Let's Encrypt |
| Authentication | JWT + HTTP-only Cookies |
| Version Control | Git & GitHub |

---

# 📂 Project Structure

```text
DevTinder
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   ├── store
│   │   └── hooks
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── app.js
│
└── README.md
```

---

# 🔄 Application Flow

```text
React App
      │
      ▼
Axios (withCredentials)
      │
      ▼
Express API
      │
JWT Cookie Authentication
      │
      ▼
MongoDB
      │
      ▼
Socket.IO
      │
      ▼
Real-Time Chat
```

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone https://github.com/Anadil01/DevTinder.git

cd DevTinder
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

Create `.env`

```env
PORT=7777

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret_key
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Create `.env`

```env
VITE_BASE_URL=http://localhost:7777
```

---

# 🌍 Production Environment

### Backend

```env
PORT=7777

MONGODB_URI=your_production_database

JWT_SECRET=your_secret
```

### Frontend

```env
VITE_BASE_URL=https://api-devtinder.2bd.net
```

---

# 🔐 Authentication Flow

```text
User Login
     │
     ▼
JWT Generated
     │
     ▼
Stored as HTTP-only Secure Cookie
     │
     ▼
Browser Sends Cookie Automatically
     │
     ▼
Express Middleware
     │
     ▼
JWT Verification
     │
     ▼
Protected Routes
```

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------|
| POST | `/signup` |
| POST | `/login` |
| POST | `/logout` |

---

## Profile

| Method | Endpoint |
|----------|----------|
| GET | `/profile/view` |
| PATCH | `/profile/edit` |
| PATCH | `/profile/password` |

---

## Feed

| Method | Endpoint |
|----------|----------|
| GET | `/feed?page=1&limit=10` |

---

## Requests

| Method | Endpoint |
|----------|----------|
| POST | `/request/send/:status/:toUserId` |
| POST | `/request/review/:status/:requestId` |
| GET | `/user/request/received` |
| GET | `/user/connections` |

---

## Chat

| Method | Endpoint |
|----------|----------|
| GET | `/chat/:targetId` |

---

# 🚀 Deployment Architecture

```text
                Vercel
                   │
                   ▼
          React Frontend
                   │
                   ▼
HTTPS Requests
                   │
                   ▼
      AWS EC2 Ubuntu Server
                   │
                   ▼
              Nginx
                   │
                   ▼
         Node.js + Express
                   │
         JWT Authentication
                   │
                   ▼
             MongoDB Atlas
                   │
                   ▼
          Socket.IO Server
```

---

# 🔒 Security

- JWT Authentication
- HTTP-only Cookies
- Secure Cookies
- SameSite=None
- Password Hashing (bcrypt)
- Protected Routes
- CORS Configuration
- HTTPS using Let's Encrypt

---

# 📦 Deployment

- Frontend → Vercel
- Backend → AWS EC2
- Reverse Proxy → Nginx
- Process Manager → PM2
- SSL Certificate → Let's Encrypt
- Database → MongoDB Atlas

---

# Future Improvements

- Google Authentication
- GitHub Authentication
- Profile Verification
- Online Status
- Typing Indicator
- Push Notifications
- Video Calling
- AI Profile Recommendation
- Advanced Search & Filters
- Docker Deployment
- CI/CD with GitHub Actions

---

# 👨‍💻 Author

**Anadil Gazi**

GitHub: https://github.com/Anadil01

LinkedIn: *(Add your LinkedIn URL here)*

---