import express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import Multer from 'multer';
import {Storage} from '@google-cloud/storage';
import {format} from 'util';
const storage = new Storage();


const app = express();
app.use(bodyParser.json());

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

app.post('/upload2', (req, res) => {

    console.log(process.env.GCS_BUCKET)
    console.log({
        name: req.body.name,
        message: req.body.message
    });
    res.json({ location: 'https://i.picsum.photos/id/896/536/354.jpg' })
});

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 100 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// Display a form for uploading files.
app.get('/', (req, res) => {
    res.render('form.pug');
});

// Process the file upload and upload to Google Cloud Storage.
app.post('/upload', multer.single('photo'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
        next(err);
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        res.json({ path: publicUrl})
        //res.status(200).send(publicUrl);
    });

    blobStream.end(req.file.buffer);
});

