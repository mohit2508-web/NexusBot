const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client if keys exist
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Initialize Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

const COLLEGE_NAME = process.env.COLLEGE_NAME || "Your College Name";
const BOT_NAME = process.env.BOT_NAME || "NexusBot";

const systemInstruction = `You are ${BOT_NAME}, an elite AI career advisor for college students at ${COLLEGE_NAME}. You specialize in:
1. Finding internship opportunities by domain, year of study, and skills
2. Creating step-by-step career roadmaps for any tech or non-tech field
3. Resume writing tips tailored for freshers and students
4. Interview preparation strategies and common questions by company type
5. Guidance on higher studies (MS, MBA, MTech) and exams (GATE, GRE, CAT, UPSC)
6. Recommending top companies to target based on skills and interest
Tone: Energetic, motivating, like a mentor in a cyberpunk video game. Use emojis sparingly. Format complex answers with bold headers. Be specific and actionable.`;

const handleChat = async (req, res) => {
    try {
        const { messages, sessionId } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Messages array is required." });
        }

        // Initialize Gemini model
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            systemInstruction: systemInstruction 
        });

        // Convert conversation tracking structure to Gemini's expected format
        let history = messages.slice(0, -1).map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));
        
        // Gemini STRICTLY requires the history to start with a 'user' message.
        // It cannot start with the bot's initial UI graphic message.
        if (history.length > 0 && history[0].role === 'model') {
            history.shift();
        }
        
        const lastMessage = messages[messages.length - 1].content;

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMessage);
        const botReply = result.response.text();

        // Optionally store the conversation round in Supabase if configured
        if (supabase && sessionId) {
            await supabase.from('chat_history').insert([
                { session_id: sessionId, role: 'user', content: lastMessage },
                { session_id: sessionId, role: 'assistant', content: botReply }
            ]).catch(err => console.error("Supabase insert error:", err));
        }

        res.json({ reply: botReply });

    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: error.message || "An error occurred while communicating with the AI server." });
    }
};

module.exports = {
    handleChat
};
