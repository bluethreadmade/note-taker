const express = require('express');
const path = require('path');

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
    // console.info(`${req.body} request to add a note received`);
    //req.body append/write to notesData
    //if successful send back 200 
    // req.status(200).json("bonked")
    //else
    //res.status(500).json("error writing to db")

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
        title,
        text,
        noteID: noteID
        };

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
