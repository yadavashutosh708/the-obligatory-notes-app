const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

var notes = 
  [
    {
      id: 1,
      content: "HTML is easy",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true,
    }
  ];

app.use(cors())
app.use(express.json())

app.get("/api/", (req, res) => res.send("<h1>Hello World!</h1>"));

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log(notes)
    notes = notes.filter(note => note.id === id);

    res.send("Done").end
})

app.post('/api/notes/', (request, response) => {
  const n = request.body;
  notes.concat(n);
  console.log(`The note is: ${n}`);
  response.json(n)
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
