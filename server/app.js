"use strict";

let express = require('express');
let app = express();
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressSession = require('express-session');
let has = require('bcrypt-nodejs');
let path = require('path');
let localStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let passport = require('passport');
let routes = require('./routes/routes.js');
let User = require('./models/users.js');


mongoose.connect('mongodb://localhost/unknown');

app.use(express.static(__dirname + "/../client"));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'royal',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/user/', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});


app.listen(3000, () =>{
  console.log("Listening on Port 3000");
})
