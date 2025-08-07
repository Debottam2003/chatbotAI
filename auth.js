const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('<h1 style="color: red; font-family: cursive;">Hello World</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});