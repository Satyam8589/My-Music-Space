# 🎵 My Music Space — Frontend

A modern music streaming web app built with **Next.js**, featuring user authentication, a dynamic sidebar, and a rich media experience.

---

## 🚀 Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/         # Login & auth components
│   │   └── layout/       # Sidebar, Navbar, etc.
│   └── config/
│       └── redux/
│           ├── action/   # Redux action creators
│           └── reducer/  # Redux reducers (user, etc.)
├── public/               # Static assets
└── README.md
```

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | [Next.js](https://nextjs.org)     |
| State Mgmt | Redux                             |
| Auth       | JWT via backend middleware        |
| Styling    | CSS / Custom components           |

---

## 🔐 Authentication

Authentication is handled via a backend middleware (`auth.middleware.js`). Redux actions and reducers in `userAction` and `userReducer` manage the authenticated user's state on the client.

---

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

For cloud deployment, [Vercel](https://vercel.com) is the recommended platform for Next.js apps.

---

## 📝 License

MIT — feel free to use and extend.
