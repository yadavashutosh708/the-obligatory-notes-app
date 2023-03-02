
/////Importing
require('dotenv').config();
const express = require("express");
const app = express();
const Note = require('./models/note.js');
const cors = require("cors");
const PORT = process.env.PORT;

/////Initializing
app.use(cors());
app.use(express.json());
app.use(express.static("build"));



app.get("/api/", (req, res) => res.send("<h1>Hello World!</h1>"));

app.get("/api/notes", (req, res) => {
  Note.find({}).then(singleNote =>
      res.json(singleNote)
    )
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = Note.findByID(id).then(note => {return note})
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(notes);
  notes = notes.filter((note) => note.id === id);

  res.send("Done").end;
});

app.post("/api/notes/", (request, response) => {
  const body = request.body;

  if(body.content == undefined){
    return response.status(400).json({error: 'content missing'});
  }
  const Note = Note({
    content: body.content,
    important: body.important
  })

  Note.save().then(
    res => response.json(res)
  )
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
