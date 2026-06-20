<div align="center">

# 💬 MERN Real-Time Messenger

**A production-grade, real-time chat platform built with the MERN stack**

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

⚡ Real-time messaging &nbsp;•&nbsp; 👥 Group chats &nbsp;•&nbsp; 🤬 Profanity filter &nbsp;•&nbsp; 🔒 JWT auth &nbsp;•&nbsp; ☁️ Image uploads &nbsp;•&nbsp; 🌗 Dark/Light mode

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Abuse Word Masker](#-abuse-word-masker)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 💬 Core Messaging
- **⚡ Real-time Messaging** — Instant message syncing and room broadcasting via Socket.io
- **👥 Group Chats** — Create and manage group conversations beyond 1-to-1
- **🟢 Online Presence** — Live user status tracking across the platform
- **📎 Media Sharing** — Cloudinary-powered image uploads in the chat stream
- **↩️ Reply Threads** — Reply to specific messages for contextual conversations

</td>
<td width="50%">

### 🛡️ Security & Performance
- **🔒 JWT Authentication** — HTTP-Only cookies with SameSite policies
- **🤬 Abuse Masker** — Trie-based profanity filter masks offensive words server-side
- **🛡️ Type-Safe Validation** — Zod schemas on both client and server
- **🚀 Static Splash** — Zero API calls on landing page for peak SEO & speed
- **📦 Zustand State** — Lightweight, predictable global state management

</td>
</tr>
</table>

### 🎨 UI & Experience
- Modern responsive UI styled with **Tailwind CSS**
- Dedicated **Dark / Light** mode toggles with glassmorphism tokens
- Production-ready split-domain deployment (Vercel + Render)

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="50%">

### Frontend — `/client`

| Technology | Purpose |
|:----------:|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) | UI library |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build tooling |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Type safety |
| ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Styling |
| ![Zustand](https://img.shields.io/badge/-Zustand-443E38?style=flat-square&logo=react&logoColor=white) | State management |
| ![Socket.io](https://img.shields.io/badge/-Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white) | Real-time client |
| ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | HTTP client |

</td>
<td align="center" width="50%">

### Backend — `/backend`

| Technology | Purpose |
|:----------:|---------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | Runtime |
| ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white) | HTTP framework |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Type safety |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Database |
| ![Socket.io](https://img.shields.io/badge/-Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white) | WebSocket engine |
| ![Passport](https://img.shields.io/badge/-Passport.js-34E27A?style=flat-square&logo=passport&logoColor=white) | JWT authentication |
| ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white) | Media storage |

</td>
</tr>
</table>

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                    │
│                                                                 │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│   │  Pages   │  │Components│  │  Hooks   │  │ Zustand Store│   │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│        │              │             │               │           │
│        └──────────────┴─────────────┴───────────────┘           │
│                    │ Axios (REST)        │ Socket.io-client      │
└────────────────────┼────────────────────┼───────────────────────┘
                     │                    │
                     ▼                    ▼
┌────────────────────────────────────────────────────────────────┐
│                    SERVER (Node.js + Express)                   │
│                                                                │
│   ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌────────────┐   │
│   │  Routes  │→ │Controllers│→ │ Services  │→ │   Models   │   │
│   └──────────┘  └──────────┘  └─────┬─────┘  └─────┬──────┘   │
│                                     │               │          │
│                              ┌──────┴──────┐        │          │
│                              │AbuseMasker  │        │          │
│                              │(Trie Filter)│        │          │
│                              └─────────────┘        │          │
│                                                     │          │
│   ┌──────────────┐  ┌────────────┐                  │          │
│   │  Socket.io   │  │ Passport   │                  │          │
│   │  (WebSocket) │  │ (JWT Auth) │                  │          │
│   └──────────────┘  └────────────┘                  │          │
└─────────────────────────────────────────┬──────────────────────┘
                                          │
                                          ▼
                                ┌──────────────────┐
                                │     MongoDB      │
                                │  ┌────────────┐  │
                                │  │   Users     │  │
                                │  │   Chats     │  │
                                │  │  Messages   │  │
                                │  │ AbuseWords  │  │
                                │  └────────────┘  │
                                └──────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| [Node.js](https://nodejs.org/) | >= 18.x |
| [MongoDB](https://www.mongodb.com/) | Atlas cluster or local instance |
| [Cloudinary](https://cloudinary.com/) account | Free tier works |

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/MERN-RealTime-Messagers-Platform.git
cd MERN-RealTime-Messagers-Platform
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=8000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
FRONTEND_ORIGIN=http://localhost:5173

# Cloudinary (required for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Seed the abuse word list (one-time):

```bash
npx ts-node src/script/seedAbuseWords.ts
```

Start the backend:

```bash
npm run dev
```

> You should see: `Abuse masker loaded 72 words into Trie` followed by `Server running on port 8000`

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file in `client/` (optional — defaults to `http://localhost:8000/api`):

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

### 4️⃣ Open the App

Navigate to **http://localhost:5173** — you're live! 🎉

---

## 🤬 Abuse Word Masker

A **server-side profanity filter** that automatically detects and masks abusive language in chat messages before they are stored or broadcast. Zero client-side changes required.

### How It Works

```
User types: "you are a chutiya"
                    │
                    ▼
        POST /api/chat/message/send
                    │
                    ▼
          sendMessageService()
                    │
                    ▼
    ┌───────────────────────────────┐
    │  abuseMasker.mask(content)    │
    │                               │
    │  Trie lookup per word:        │
    │   "you"     → ✗ (pass)       │
    │   "are"     → ✗ (pass)       │
    │   "a"       → ✗ (pass)       │
    │   "chutiya" → ✓ (MATCH!)     │
    │                               │
    │  Output: "you are a *******"  │
    └───────────────────────────────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   Save to MongoDB    WebSocket broadcast
   (masked content)   (masked content)
```

### Why a Trie?

| Approach | Time Complexity | 1000 words × 50-word message |
|----------|:-:|:-:|
| **Brute-force list scan** | O(n × m) | 50,000 comparisons |
| **Regex alternation** | O(n × m) | Regex backtracking overhead |
| **Trie lookup** ✅ | O(m) per word | **50 lookups** (word-length only) |

> The Trie provides **constant-time lookups** regardless of how many abuse words are in the dictionary.

### Architecture

| Component | File | Purpose |
|:----------|:-----|:--------|
| 🌳 **Trie + Masker** | `backend/src/lib/abuseMasker.ts` | Singleton — builds Trie from DB, provides `mask(text)` |
| 📄 **MongoDB Model** | `backend/src/models/abuseWord.model.ts` | Stores words with unique lowercase index |
| 🌱 **Seed Script** | `backend/src/script/seedAbuseWords.ts` | Pre-populates ~72 English + Hindi profanity words |
| 🔌 **Admin API** | `backend/src/routes/abuseWord.route.ts` | REST endpoints to view/add words at runtime |
| 🔗 **Integration** | `backend/src/services/message.service.ts` | Hooks masker into the message pipeline |

### Design Decisions

| Decision | Rationale |
|:---------|:----------|
| **Trie data structure** | O(m) per-word lookup — scales to any dictionary size |
| **Word-boundary splitting** | `\b` regex split prevents "class" being flagged by "ass" |
| **Server-side only** | Masked before DB write — all clients always see clean text |
| **Case-insensitive** | "FUCK", "Fuck", "fuck" are all caught identically |
| **Hot-reload** | Admin API reloads Trie instantly — no server restart needed |
| **Asterisk matching** | Replacement length matches original word (`shit` → `****`) |

### Seeding the Word List

```bash
cd backend
npx ts-node src/script/seedAbuseWords.ts
```

```
✓ Database connected for seeding
✓ Successfully seeded 72 abuse words
✓ Total abuse words in database: 72
✓ Database disconnected
```

> Includes English profanity, slurs, and common Hindi/Indian abuse words. Duplicates are automatically skipped on re-runs.

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive JWT cookie |
| `POST` | `/api/auth/logout` | Clear auth cookie |

### Chat

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| `POST` | `/api/chat/create` | Create a new chat (1-to-1 or group) |
| `GET` | `/api/chat/all` | Get all chats for the authenticated user |
| `GET` | `/api/chat/:id` | Get a single chat with message history |
| `POST` | `/api/chat/message/send` | Send a message (auto-masked for profanity) |

### Abuse Words (Admin)

| Method | Endpoint | Body | Description |
|:------:|:---------|:-----|:------------|
| `GET` | `/api/abuse-words` | — | List all abuse words |
| `POST` | `/api/abuse-words/add` | `{ "words": ["word1", "word2"] }` | Add words & hot-reload Trie |

> 🔒 All endpoints (except register/login) require JWT authentication via HTTP-Only cookie.

### WebSocket Events

| Event | Direction | Payload | Description |
|:------|:---------:|:--------|:------------|
| `online:users` | Server → Client | `string[]` | Broadcast online user IDs |
| `chat:join` | Client → Server | `chatId` | Join a chat room |
| `chat:leave` | Client → Server | `chatId` | Leave a chat room |
| `chat:new` | Server → Client | `Chat` | New chat created |
| `chat:update` | Server → Client | `{ chatId, lastMessage }` | Chat updated with new message |
| `message:new` | Server → Client | `Message` | New message in chat room |

---

## 🚀 Deployment

This repository is configured for **split-domain deployment** — separating the frontend (static) from the backend (WebSocket-capable).

### Backend → [Render.com](https://render.com)

A `render.yaml` Blueprint is included at the project root.

1. Import the repository into Render as a **New Blueprint**
2. Render auto-detects the backend service
3. Set environment variables in the Dashboard
   - Set `FRONTEND_ORIGIN` to your Vercel URL (no trailing `/`)

### Frontend → [Vercel](https://vercel.com)

1. Import the repository into Vercel
2. Set **Root Directory** to `client`
3. Set `VITE_API_URL` to your Render backend URL (e.g., `https://your-backend.onrender.com/api`)
4. **Deploy** 🚀

> A `vercel.json` rewrite config is included in `/client` so SPA routes like `/chat` never 404.

---

## 📁 Project Structure

```
MERN-RealTime-Messagers-Platform/
├── backend/
│   └── src/
│       ├── config/            # Database, env, cloudinary, passport configs
│       ├── controllers/       # Route handlers (auth, chat, message, abuseWord)
│       ├── lib/
│       │   ├── socket.ts      # Socket.io server initialization & events
│       │   └── abuseMasker.ts # 🌳 Trie-based profanity filter (singleton)
│       ├── middlewares/       # Auth, error handling, async wrapper
│       ├── models/            # Mongoose schemas (User, Chat, Message, AbuseWord)
│       ├── routes/            # Express route definitions
│       ├── script/
│       │   └── seedAbuseWords.ts  # 🌱 Database seeder for abuse words
│       ├── services/          # Business logic layer
│       ├── utils/             # Helpers (bcrypt, cookies, env)
│       ├── validators/        # Zod request schemas
│       └── index.ts           # Server entry point
├── client/
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── hooks/             # Custom React hooks (auth, chat, socket)
│       ├── layouts/           # Page layout wrappers
│       ├── lib/               # Axios client, helpers, utils
│       ├── pages/             # Route-level page components
│       ├── routes/            # React Router configuration
│       ├── types/             # TypeScript type definitions
│       └── App.tsx            # Root component
├── render.yaml                # Render deployment blueprint
└── vercel.json                # Vercel deployment config
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">

**Built with ❤️ using the MERN Stack**

⭐ Star this repo if you found it useful!

</div>
