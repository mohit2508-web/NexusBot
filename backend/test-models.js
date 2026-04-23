const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    try {
        const apiKey = "AIzaSyAQrlbk71airdo6QTWl73dR9fTSnbuzu-E";
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log("AVAILABLE MODELS:", data.models.map(m => m.name));
    } catch (e) {
        console.error("Failed to list models:", e.message);
    }
}

listModels();
