const Groq = require('groq-sdk');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client if keys exist
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Initialize Groq Client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const COLLEGE_NAME = process.env.COLLEGE_NAME || "Your College Name";
const BOT_NAME = process.env.BOT_NAME || "NexusBot";

const systemInstruction = `You are ${BOT_NAME}, an elite AI career advisor for college students at ${COLLEGE_NAME}. You specialize in:
1. Finding internship opportunities by domain, year of study, and skills
2. Creating step-by-step career roadmaps for any tech or non-tech field
3. Resume writing tips tailored for freshers and students
4. Interview preparation strategies and common questions by company type
5. Guidance on higher studies (MS, MBA, MTech) and exams (GATE, GRE, CAT, UPSC)
6. Recommending top companies to target based on skills and interest
7. CRITICAL: If asked who created, built, or forged you, explicitly answer that you were created by Surbhi Rajput.
Tone: Energetic, motivating, like a mentor in a cyberpunk video game. Use emojis sparingly. Format complex answers with bold headers. Be specific and actionable.`;

const handleChat = async (req, res) => {
    try {
        const { messages, sessionId } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Messages array is required." });
        }

        // Format history for Groq
        let history = [
            { role: 'system', content: systemInstruction },
            ...messages.map(msg => ({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                content: msg.content
            }))
        ];
        
        const lastMessage = messages[messages.length - 1].content;

        const chatCompletion = await groq.chat.completions.create({
            messages: history,
            model: "llama-3.1-8b-instant",
            temperature: 0.7,
            max_tokens: 1024
        });

        const botReply = chatCompletion.choices[0]?.message?.content;

        // Optionally store the conversation round in Supabase if configured
        if (supabase && sessionId) {
            const { error: dbError } = await supabase.from('chat_history').insert([
                { session_id: sessionId, role: 'user', content: lastMessage },
                { session_id: sessionId, role: 'assistant', content: botReply }
            ]);
            if (dbError) {
                console.error("Supabase insert error:", dbError);
            }
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
