require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "welcome";

async function generateContentCustom(prompt) {
    try {
        const result = await model.generateContent(prompt);
        //console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.log(error);
    }
}


let express = require('express');
let path = require('path');
let cors = require('cors');

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("ai");
});

app.post('/ai', async (req, res) => {
    try {
    let ai_data = await generateContentCustom(req.body.prompt);
    console.log(ai_data);
    let clean_data = ai_data.split('\n').filter((line) => { return line.length > 0 });
    res.render("ai", { ai_data: clean_data });
    } catch(err) {
        console.log(err.message);
        res.render("ai");
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});


