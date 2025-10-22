const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/prompts', require('./routes/prompts'));
app.use('/api/templates', require('./routes/templates'));
app.use('/api/brand-voices', require('./routes/brandVoices'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/payments', require('./routes/payments'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PromptGenius API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

