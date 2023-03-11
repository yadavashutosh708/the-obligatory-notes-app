require('express-async-errors');

const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supertest = require('supertest')
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

loginRouter.post('/', async (request, response, next) => {
    const body = request.body;
    const { username, password } = body;


    const user = await User.findOne({ username })
    
    const passwordCorrect = user === null ? false : bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) { response.status(401).json({ error: 'Invalid credentials' }) };


    const userToken = {
        user: user.username,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET);

    response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter