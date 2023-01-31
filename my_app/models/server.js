const express = require("express");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    colors.enable();

    // Middlewares
    this.middlewares();

    //Database
    this.database();

    // Rutas
    this.routers();

    // handle Error
    this.handeError();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // HTTP Interceptor
    this.app.use(logger("tiny"));
    // Appalication/json
    this.app.use(express.json());
    // Peticiones con URlEncoded
    this.app.use(express.urlencoded({ extended: true }));
    //Cookie
    this.app.use(cookieParser());
    // Directorio publico
    this.app.use(express.static("public"));
  }

  routers() {
    //Rutas del Rest API
    require("../routers/example.router")(this.app);
  }

  database() {
    const db = require("./index.js");
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
        console.log("Cannot connect to the database!", err);
        process.exit();
      });
  }

  handeError() {
    // catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    this.app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      res
        .status(err.status || 500)
        .json({ error: err.status || 500, url: req.url });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
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
  }
}

module.exports = Server;
