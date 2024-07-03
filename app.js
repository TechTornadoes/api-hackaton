const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session')
const uuid = require("uuid").v4;

const app = express();

const cors = require('cors') // initialisation de cors

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    genid: function(req) {
         return uuid(); // use UUIDs for session IDs
      },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }))
// Importer les routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

module.exports = app;