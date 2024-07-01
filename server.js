const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.port || 5501;

const app = express();

app.use('/api', api);
app.use(express.static('public'));



// GET Route for homepage
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );

// GET Route for homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );

 
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);