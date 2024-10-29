// server.js
const express = require('express');
const app = express();
const healthRoutes = require('./routes/HealthRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', healthRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
