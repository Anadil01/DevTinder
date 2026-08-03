# DevTinder

DevTinder is a full-stack developer networking app. Users can create a profile, discover other developers, send or review connection requests, manage their connections, and chat with accepted connections in real time.

## Features

- Email/password signup and login with JWT authentication stored in HTTP-only cookies
- Editable developer profiles with bio, skills, photo, age, and gender
- Paginated developer feed
- Send interest or ignore requests; accept or reject incoming requests
- View accepted connections
- Persistent one-to-one chat with real-time Socket.IO messages

## Tech stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router, Redux Toolkit, Axios, Tailwind CSS |
| Backend | Node.js, Express, Mongoose, JWT, bcrypt, Socket.IO |
| Database | MongoDB |

## Project structure

```text
DevTinder/
├── frontend/             # React client
│   └── src/
│       ├── pages/        # Feed, profile, requests, connections, and chat
│       ├── component/    # Reusable UI and route protection
│       └── utils/        # Redux store, API URL, and Socket.IO client
└── backend/              # Express API and Socket.IO server
    └── src/
        ├── models/       # User, connection request, and message schemas
        ├── routes/       # Auth, profile, feed, requests, and chat endpoints
        └── middlewares/  # JWT cookie authentication
```

## Prerequisites

- Node.js 18 or newer
- MongoDB (local instance or MongoDB Atlas connection string)

## Getting started

1. Clone the repository and enter it.

   ```bash
   git clone <repository-url>
   cd DevTinder
   ```

2. Configure the backend environment in `backend/.env`.

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
   JWT_SECRET=replace-with-a-long-random-secret
   ```

3. Install dependencies and start the API server.

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   The API and Socket.IO server run at `http://localhost:7777`.

4. In a second terminal, install dependencies and start the frontend.

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Open the URL shown by Vite (normally `http://localhost:5173`).

The frontend API URL is currently set to `http://localhost:7777` in `frontend/src/utils/constant.js`. If you use another backend host or port, update that value and the backend CORS configuration in `backend/src/app.js` and `backend/src/utils/scoket.js`.

## Available commands

| Location | Command | Purpose |
| --- | --- | --- |
| `backend` | `npm run dev` | Run the Express server with Nodemon |
| `frontend` | `npm run dev` | Start the Vite development server |
| `frontend` | `npm run build` | Create a production build |
| `frontend` | `npm run lint` | Run ESLint |
| `frontend` | `npm run preview` | Preview the production build |

## API overview

Protected endpoints require the authentication cookie created during signup or login.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/signup` | Create an account |
| POST | `/login` | Sign in |
| POST | `/logout` | Sign out |
| GET | `/profile/view` | Get the signed-in profile |
| PATCH | `/profile/edit` | Update profile details |
| PATCH | `/profile/password` | Change password |
| GET | `/feed?page=1&limit=10` | Get discoverable developers |
| POST | `/request/send/:status/:toUserId` | Send an `interested` or `ignored` request |
| POST | `/request/review/:status/:requestId` | Mark an incoming request `accepted` or `rejected` |
| GET | `/user/request/received` | List pending incoming requests |
| GET | `/user/connections` | List accepted connections |
| GET | `/chat/:targetId` | Get chat history with a user |

## Real-time chat

The client joins a room named from the two participant IDs, then emits `sendMessage` events. The server saves each message to MongoDB and broadcasts a `messageReceived` event to everyone in that room.

## Notes

- The backend listens on port `7777` and only permits the local Vite origin by default.
- For a production deployment, configure HTTPS, secure cookies, environment-specific CORS origins, and a strong `JWT_SECRET`.
