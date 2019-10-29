var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var stadRouter = require('./routes/stad');
var landRouter = require('./routes/land');
var nystadRouter = require('./routes/nystad');
var nylandRouter = require('./routes/nyland');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/stad', stadRouter);
app.use('/land', landRouter);
app.use('/nystad', nystadRouter);
app.use('/nyland', nylandRouter);


module.exports = app;
