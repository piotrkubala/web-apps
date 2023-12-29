const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');

require('./routes/trips');
require('./routes/history');
require('./routes/opinions');

const port = 5123;
const app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  res.status(err.status || 500);
  res.json({
    message: "Error occured",
    description: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;

app.listen(port, () => {
  console.log(`App listening at ${port} port`);
});
