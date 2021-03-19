var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');

const usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
const gamesRouter = require('./routes/games.js');
const scoresRouter = require('./routes/scores');
const statsRouter = require('./routes/stats');

//Initiallize mongodb connection before starting app
var db = require('./db');
const { reverse } = require('lodash');

const User = require('./models/User');

var app = express();

const accessTokenSecret = process.env.access_secret || 'jwt-sign-secret-2020';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("client/build"));


app.use('/api/v1/auth', authRouter);

/* 
  Add user id to all other requests
*/
app.use('/api', async function(req, res, next) {
  const token = req.headers['slb-token'];
  if(!token) {
    const { slb_access, slb_secret } = req.headers;
    if( !slb_access ) {
      throw new Error('No auth provided')
    }
    else {
      req.userId = await User.loadFromKeys({ slb_access, slb_secret });
      console.log('req for user using access key: ' + req.userId);
      next();
    }
  } else {
    jwt.verify(token, accessTokenSecret, function(err, decodedToken) {
      if(err) { /* handle token err */ 
        console.error(err)
        next()
      }
      else {
       req.userId = decodedToken.userId;   // Add to req object
       console.log('req for user: ' + req.userId);
       next();
      }
    });
  }
 });

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/scores', scoresRouter);
app.use('/api/v1/stats', statsRouter);


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err)
  // render the error page 
  res.status(err.status || 500).send('Error with your request!');
  // res.render('error');
});

module.exports = app;
