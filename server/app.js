/////Importing

const config = require("./utils/config");
const logger = require("./utils/logger");
const notesRouter = require("./controllers/notes");
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleWare = require('./utils/middleware');

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();

///Connecting to DB

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
.then(() => {
  logger.info("Connected to MongoDB Database.");
})
.catch(error => {
  logger.error("error connecting to MongoDB:" , error.message);
});


/////Initializing
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleWare.requestLogger);

app.use('/api/login', loginRouter);
app.use('/api/notes', notesRouter);
app.use('/api/users', userRouter);

// handler of requests with unknown endpoint
app.use(middleWare.unknownEndpoint);
app.use(middleWare.errorHandler);

module.exports = app