# NexusBot - AI Career Advisor Chatbot

**NexusBot** is an AI-powered career advisor chatbot designed for college students. It helps students with internships, career roadmaps, resume tips, interview preparation, and higher studies guidance.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 19 + Vite | User interface |
| **3D Graphics** | Three.js | Animated cyberpunk background |
| **Backend** | Express.js | API server |
| **AI Engine** | Google Gemini (Flash) | Smart responses |
| **Database** | Supabase | Stores chat history (optional) |

---

## Project Structure

```
Chatbot-Project/
├── backend/              # Express API server
│   ├── controllers/      # Chat logic
│   │   └── chatController.js
│   ├── routes/           # API routes
│   │   └── chatRoutes.js
│   ├── server.js        # Main server file
│   └── package.json
│
├── frontend/            # React + Vite app
│   ├── src/
│   │   ├── components/ # React components
│   │   │   ├── ChatPanel.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── ActionChips.jsx
│   │   │   └── ThreeBackground.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md            # This file
```

---

## How It Works

1. **User types question** in the chat box
2. **React sends** the message to the Express backend via API
3. **Express passes** the message to **Google Gemini AI**
4. **Gemini thinks** and generates a career advice response
5. **Response flows back** to the frontend and displays with a typewriter effect
6. **(Optional)** Chat is saved to Supabase database

---

## Features

- 🎮 Cyberpunk/Sci-fi UI theme
- 🔮 Typewriter text animation
- 💬 Quick action chips (internships, roadmaps, resume tips)
- 📱 Responsive design
- 🌐 Uses Google Gemini Flash for fast AI responses

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

Create a `.env` file in the `backend` folder:

```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_key_here
COLLEGE_NAME=Your College Name
BOT_NAME=NexusBot
```

### Running

```bash
# Terminal 1 - Start backend
cd backend
node server.js

# Terminal 2 - Start frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message to AI |
| GET | `/health` | Health check |

### POST /api/chat

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "How do I get an internship?" }
  ],
  "sessionId": "abc123"
}
```

**Response:**
```json
{
  "reply": "Here are some tips to get an internship..."
}
```

---

## Creator

**Surbhi Rajput**

---

## License

ISC