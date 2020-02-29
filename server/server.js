import express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as  multer from 'multer';
import MulterGoogleCloudStorage from 'multer-google-storage';



const app = express();

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

    console.log(process.env.GCS_BUCKET)
    console.log({
        name: req.body.name,
        message: req.body.message
    });
    res.json({ location: 'https://i.picsum.photos/id/896/536/354.jpg' })
});

//Initialize multers3 with our s3 config and other options
const upload = multer({
    storage: new MulterGoogleCloudStorage({bucket: process.env.GCS_BUCKET})
})();

// Process the file upload and upload to Google Cloud Storage.
app.post('/upload', upload.single('photo'), (req, res, next) => {
    console.log(req.files);
    res.json(req.files);
});
