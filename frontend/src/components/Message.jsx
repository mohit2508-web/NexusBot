import React, { useEffect, useState, useRef } from 'react';

const BotSVG = (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 0 1 3 3v2h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v1a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2v-2a3 3 0 0 1 3-3h1V5.73A2 2 0 0 1 12 2zm3 7H9a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1zm-4 4h2v2h-2v-2zm-1-2h4v1h-4v-1z"/>
    </svg>
);

const Message = ({ isUser, text, isTypingIndicator, useTypewriter }) => {
    const [displayedText, setDisplayedText] = useState(useTypewriter && !isUser ? '' : text);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (useTypewriter && !isUser && !isTypingIndicator) {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                }
            }, 18);
            return () => clearInterval(interval);
        } else {
            setDisplayedText(text);
        }
    }, [text, useTypewriter, isUser, isTypingIndicator]);

    // Simple markdown strong text parse
    const createMarkup = (content) => {
        if (!content) return { __html: '' };
        const formatted = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>');
        return { __html: formatted };
    };

    if (isUser) {
        return (
            <div className="message-row user">
                <div className="bubble" dangerouslySetInnerHTML={createMarkup(text)} />
            </div>
        );
    }

    return (
        <div className="message-row bot">
            <div className="bubble-container">
                <div className="bot-avatar">
                    {BotSVG}
                </div>
                <div className="bubble">
                    {isTypingIndicator ? (
                        <div className="typing-indicator">
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                        </div>
                    ) : (
                        <div dangerouslySetInnerHTML={createMarkup(displayedText)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
