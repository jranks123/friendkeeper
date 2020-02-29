const express = require('express');
const app = express();
const path = require(`path`);
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/form.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    console.log({
        name: req.body.name,
        message: req.body.message
    });
    res.send('Thanks for your message!');
});

app.post('/upload', (req, res) => {
    console.log({
        name: req.body.name,
        message: req.body.message
    });
    res.send('Thanks for your message!');
});