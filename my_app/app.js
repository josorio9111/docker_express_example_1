const createError = require("http-errors");
const express = require("express");
const colors = require("colors");
// const cookieParser = require("cookie-parser");
const logger = require("morgan");

const index = require("./rutas/index");
const peticion = require("./rutas/peticiones");

const app = express();
colors.enable();

app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.get("/", index);
app.get("/p", peticion);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.status || 500 , url: req.url});
});
const port = 3000;

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`.rainbow);
  console.log(
    ` .  o ..
  o . o o.o
       ...oo
         __[]__
      __|_o_o_o\__
      \""""""""""/
       \. ..  . /
  ^^^^^^^^^^^^^^^^^^^^`.rainbow
  );
});
