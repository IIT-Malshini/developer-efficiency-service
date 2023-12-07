const express = require('express');
const githubController = require('./controllers/githubController');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('src/public')); // Serve static files

app.post('/calculate-productivity', githubController.calculateProductivity);

app.listen(3000, () => console.log('Server running on port 3000'));
