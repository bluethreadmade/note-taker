const express = require('express');
const path = require('path');

const PORT = process.env.port || 5501;

const app = express();

app.use(express.static('public'));

const notesData = require('./db/db.json');

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );

// GET Route for all notes data  
app.get('/api/notes', (req, res) => res.json(notesData));

// GET Route for homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );


// // POST Route for new note
// app.post('api/notes', (req, res) => {

// })

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
