require("express-async-errors");
const notesRouter = require("express").Router();
const User = require("../models/user.js")
const Note = require("../models/note.js");
const jwt = require('jsonwebtoken');

const getTokenFrom = async (request, next) => {
  const authorization = await request.get('authorization')

  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '')
  }
  return null;
}

notesRouter.get("/", async (request, res, next) => {
  const body = request.body;
  const jwtToken = await getTokenFrom(request);
  const decodedToken = jwt.verify(jwtToken, process.env.SECRET);
  if (!decodedToken.id) { return response.status(401).json({ error: 'token invalid' }) }
  

  const user = await User.findById(decodedToken.id).populate('notes');
  console.log(user.notes);
  res.json(user.notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  const id = Number(request.params.id);

  const singleNote = await Note.findById(id);
  if (singleNote) {
    response.json(singleNote);
  } else {
    response.status(404).json({ error: "Note not found" });
  }
});

notesRouter.delete("/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  const note = await Note.findByIdAndRemove(id);
  res.status(204).json({ successful: "Note deleted" });
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const jwtToken = await getTokenFrom(request);
  const decodedToken = jwt.verify(jwtToken, process.env.SECRET);
  if (!decodedToken.id) { return response.status(401).json({ error: 'token invalid' }) }

  const user = await User.findById(decodedToken.id);

  if (body.content == undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  });

  const returnedNote = await note.save();
  user.notes = user.notes.concat(returnedNote._id)
  await user.save()
  response.status(201).json(returnedNote);
});

notesRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  const body = request.params.body;

  if (body.content == undefined) {
    return response.status(400).json({ error: "content missing" }).end();
  }

  const not = {
    content: body.content,
    important: body.important,
  };

  const update = await Note.findByIdAndUpdate(id, not, { new: true });
  response.json(update);
});

module.exports = notesRouter;
