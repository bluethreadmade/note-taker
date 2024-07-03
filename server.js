const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 5501;

const app = express();

app.use(express.static('public'));
//parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add npm package
const { v4: uuidv4 } = require('uuid');

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );

// GET Route for all notes data  
app.get('/api/notes', (req, res) => {
    // read existing date from db.json
    notesData = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    res.json(notesData);
});

// GET Route for wildcard
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))

);  



// POST Route for new note
app.post('/api/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // create unique id for new note
        let id = uuidv4();

        // read existing date from db.json
        notesData = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

        // Variable for the object to save
        const newNote = {
            title,
            text,
            id
        };

        // add newNote to the notes array
        notesData.push(newNote);

        // write updated notes array back to db.json
        fs.writeFileSync('./db/db.json', JSON.stringify(notesData, null, 2));

        res.json(newNote);

    }
    else {
    res.status(500).json('Error in posting notes');
  }
});

app.delete('/api/notes/:id', (req, res) => {
    // read existing date from db.json
    notesData = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    // filter the notes array to removed the object whose id matches the request parameter id
    let newNotesData = notesData.filter(({ id }) => id !== req.params.id);

    // write updated notes array back to db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(newNotesData, null, 2));

    const response = {
        status: 'deleted',
        body: newNotesData,
        };

        console.log(response);
        res.json(response);

});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
