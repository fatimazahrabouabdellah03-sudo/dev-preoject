const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // URL de ton frontend React
  credentials: true
}));
app.use(express.json());

// Routes
const stageRoutes = require('./routes/stageRoutes');
app.use('/api/stages', stageRoutes);

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'API Stage Platform is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});