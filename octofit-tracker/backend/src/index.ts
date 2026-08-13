import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OctoFit Tracker API is running', port: PORT });
});

// Start server
app.listen(PORT, () => {
  console.log(`OctoFit Tracker backend running on port ${PORT}`);
});
