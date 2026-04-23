const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// MUST be called before importing any modules that depend on env vars!
dotenv.config();

const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'NexusBot API Server Running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
