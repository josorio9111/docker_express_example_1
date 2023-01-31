const createError = require("http-errors");
const express = require("express");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");  // HTTP request logger middleware
// const cors = require('cors');
require("dotenv").config();



const index = require("./routers/index");

const app = express();
colors.enable();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const db = require("./models");

console.log(`${db.url}`.bgBlue);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!".cyan);
  })
  .catch((err) => {
    console.log("Cannot connect to the database!\n", err);
    process.exit();
  });
  
// Routers
app.get("/", index);
require("./routers/example.router")(app);

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
  res.json({ error: err.status || 500, url: req.url });
});

const port = process.env.PORT || 3001;
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
