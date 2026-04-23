import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import ActionChips from './ActionChips';

const ChatPanel = () => {
    const [messages, setMessages] = useState([
        { 
            role: 'assistant', 
            content: `⚡ NEXUSBOT ONLINE. I am your college career intelligence system.\nAsk me about internships, career roadmaps, resume tips, or top companies.\nHow can I power up your future today?` 
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);
    const [showChips, setShowChips] = useState(true);
    const [flashPanel, setFlashPanel] = useState(false);
    
    // Session ID randomly generated per user visit for anon supabase logging
    const [sessionId] = useState(Math.random().toString(36).substring(7));

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isWaiting]);

    const handleSend = async (textOveride) => {
        const text = typeof textOveride === 'string' ? textOveride : inputValue.trim();
        if (!text || isWaiting) return;

        // Flash panel effect
        setFlashPanel(true);
        setTimeout(() => setFlashPanel(false), 250);

        const newUserMessage = { role: 'user', content: text };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setShowChips(false);
        setIsWaiting(true);

        if (inputRef.current) {
            inputRef.current.style.height = '52px';
        }

        try {
            // Need to send the history to the backend
            // In a real app we'd filter out the welcome message if the model doesn't need it or if it acts as a system prompt.
            // But formatting it as an assistant response is valid Anthropic history format.
            const apiMessages = [...messages, newUserMessage].map(m => ({
                role: m.role,
                content: m.content
            }));

            // Make sure the API_URL is correct from env
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            
            const res = await axios.post(`${apiUrl}/api/chat`, {
                messages: apiMessages,
                sessionId: sessionId
            });

            if (res.data && res.data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
            } else {
                throw new Error("Invalid response from server");
            }

        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.error || error.message;
            setMessages(prev => [...prev, { role: 'assistant', content: `⚠ SIGNAL LOST. ${errMsg}` }]);
        } finally {
            setIsWaiting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        e.target.style.height = '52px';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    };

    const handleRipple = (e) => {
        const btn = e.currentTarget;
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        btn.appendChild(ripple);
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        setTimeout(() => ripple.remove(), 600);
        handleSend();
    };

    return (
        <div className={`chat-panel ${flashPanel ? 'flash-border' : ''}`}>
            <div className="scanlines"></div>
            
            <div className="hud-bar">
                <div className="hud-left">
                    <span>◈ NEXUSBOT v2.0</span>
                </div>
                <div className="hud-center">
                    CAREER INTELLIGENCE SYSTEM
                </div>
                <div className="hud-right">
                    <div className="status-dot"></div>
                    <span>ONLINE</span>
                    <span className="signal-bars">▌▌▌</span>
                </div>
            </div>

            <div className="messages-area">
                {messages.map((msg, idx) => (
                    <Message 
                        key={idx} 
                        isUser={msg.role === 'user'} 
                        text={msg.content} 
                        useTypewriter={idx === messages.length - 1 && msg.role === 'assistant' && idx !== 0}
                    />
                ))}
                
                {isWaiting && <Message isTypingIndicator={true} />}
                
                <div ref={messagesEndRef} />
            </div>

            <ActionChips isVisible={showChips} onChipClick={(text) => handleSend(text)} />

            <div className="input-row">
                <textarea 
                    className="user-input"
                    ref={inputRef}
                    placeholder="Query the career matrix..."
                    rows={1}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    aria-label="Chat input"
                />
                <button className="send-btn" onClick={handleRipple} title="Send Payload">➤</button>
            </div>
        </div>
    );
};

export default ChatPanel;
