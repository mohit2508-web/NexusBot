# NexusBot: AI Career Advisor Chatbot

## 1. Project Vision
**NexusBot** is an intelligent, AI-powered career guidance platform designed specifically for college students. The vision is to provide 24/7 personalized mentorship, helping students navigate their academic and professional journeys with ease. It acts as a bridge between college education and industry expectations by providing actionable advice on internships, roadmaps, and resume building.

## 2. How It Works (Step-by-Step)
1. **User Interaction**: The student opens the web application and types a career-related query (e.g., "How do I prepare for a software engineering interview?").
2. **Frontend Processing**: The React-based user interface captures the input and seamlessly sends it to the backend API.
3. **Backend Routing**: The Express.js backend receives the request and forwards the user's message to the AI Engine.
4. **AI Generation**: The ultra-fast Groq AI engine (leveraging the LLaMA 3 model) processes the prompt and generates tailored, contextual career advice.
5. **Response Delivery**: The generated advice is sent back to the frontend, where it is displayed to the user with a sleek typewriter animation, mimicking a real human conversation.
6. **Data Logging**: Chat interactions are securely managed, and can be logged into Supabase for session history.

## 3. Technology Stack
The application is built on a modern, robust, and highly responsive full-stack architecture:

### Frontend (Client-Side)
- **React 19 & Vite**: Ensures a lightning-fast, component-based user interface with instant development server updates.
- **Three.js**: Powers the immersive, 3D animated cyberpunk background, creating a visually striking and engaging experience.
- **CSS / UI**: Customized styling for action chips, chat panels, and responsive layouts.

### Backend (Server-Side)
- **Node.js & Express.js**: Handles API routing, server logic, and connects the frontend to the AI services.
- **Groq SDK (LLaMA 3)**: Provides blazing-fast AI inference. We recently migrated to Groq to dramatically reduce response latency.
- **Cors & Dotenv**: Manages cross-origin resource sharing and environment variable security securely.

### Database
- **Supabase**: An open-source Firebase alternative utilized for scalable database management and storing chat histories.

## 4. Key Features
- **Immersive Cyberpunk UI**: A dynamic, interactive 3D background that instantly grabs attention.
- **Typewriter Text Animation**: Enhances readability and gives a natural, human-like feel to AI responses.
- **Quick Action Chips**: Pre-defined, one-click prompts for common queries (e.g., Internships, Roadmaps, Resume Tips).
- **Blazing Fast AI**: Sub-second response times giving a real-time conversational feel.

## 5. Future Scope (What's Next?)
- **Automated Resume Parsing**: Allow users to upload their resumes (PDFs) for the AI to analyze and suggest real-time improvements.
- **Mock Interview Simulator**: Implement voice-to-text and text-to-voice for interactive mock interviews with instant feedback.
- **Live Internship Integration**: Connect with external job board APIs to fetch and recommend real-time internship openings based on the user's skills.
- **Personalized Dashboards**: Implement user authentication so students can save their generated roadmaps and track their learning progress over time.

## 6. Project Credits
- **Creator**: Surbhi Rajput
