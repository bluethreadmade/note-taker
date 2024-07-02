const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 5501;

const app = express();

app.use(express.static('public'));
//parse incoming request bodies
app.use(express.json());

const notesData = require('./db/db.json');

// add npm package
const { v4: uuidv4 } = require('uuid');
let noteID = uuidv4();

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


// POST Route for new note
app.post('/api/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {

        // read existing date from db.json
        const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

        // Variable for the object to save
        const newNote = {
            title,
            text,
            noteID
        };

        // add newNote to the notes array
        notes.push(newNote);

        // write update notes array back to db.json
        fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));

        const response = {
        status: 'success',
        body: newNote,
        };

        console.log(response);
    }
    else {
    res.status(500).json('Error in posting review');
  }
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
