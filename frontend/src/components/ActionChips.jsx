import React from 'react';

const ActionChips = ({ onChipClick, isVisible }) => {
    if (!isVisible) return null;

    const chips = [
        "🚀 Find Internships",
        "🗺️ Career Roadmap",
        "📄 Resume Tips",
        "🏢 Top Companies",
        "🎓 Higher Studies",
        "💼 Interview Prep"
    ];

    return (
        <div className="chips-container">
            {chips.map((text, index) => (
                <button
                    key={index}
                    className="action-chip"
                    style={{ animationDelay: `${index * 80}ms` }}
                    onClick={() => onChipClick(text)}
                >
                    {text}
                </button>
            ))}
        </div>
    );
};

export default ActionChips;
