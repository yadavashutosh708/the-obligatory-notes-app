
/////Importing
require('dotenv').config();
const express = require("express");
const app = express();
const Note = require('./models/note.js');
const cors = require("cors");
const PORT = process.env.PORT;

/////Initializing
app.use(cors());
app.use(express.static("build"));
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
}).catch(error => next(error));

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
  const note = Note({
    content: body.content,
    important: body.important
  })

  note.save().then(
    res => response.json(res)
  )
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)