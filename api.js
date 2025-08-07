const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res, next) => {
    console.log("request came");
    //res.send("hello");
    const url = 'https://api.freeapi.app/api/v1/public/meals/meal/random';
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    let response = await axios.get(url, options);
    console.log(response.data.data.strMeal);
    res.send(response.data.data.strMeal);
});

app.get("/boredom", async (req, res, next) => {
    let url = "https://bored-api.appbrewery.com/random";
    let response = await axios.get(url);
    res.send(response.data.activity);
    console.log(response.data.activity);
});

app.listen(process.env.PORT, function () {
    console.log("The server is listenting port " + process.env.PORT);
});