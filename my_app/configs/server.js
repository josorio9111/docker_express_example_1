const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const cors = require("cors");
const { dbConnectt } = require("../database/db.connect");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.examplesPath = "/api/examples";
    this.authPath = "/api/auth";
    this.examplePath = "/api/examples";
    this.usuarioPath = "/api/usuarios";

    //Database
    this.database();

    // Middlewares
    this.middlewares();

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
    // Parser body to json
    this.app.use(express.json());
    // Peticiones con URlEncoded
    this.app.use(express.urlencoded({ extended: true }));
    // Cookie
    this.app.use(cookieParser());
    // Directorio publico
    this.app.use(express.static("public"));
  }

  routers() {
    // api/examples
    this.app.use(this.examplesPath, require('../routers/example.router'));
    // api/auth
    this.app.use(this.authPath, require("../routers/auth.router"));
    //  api/examples
    this.app.use(this.examplePath, require("../routers/example.router"));
    //  api/usuarios
    this.app.use(this.usuarioPath, require("../routers/usuarios.router"));
  }

  async database() {
    await dbConnectt();
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

      res.status(err.status || 500);
      res.json({ error: err.status || 500, url: req.url });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Example app listening on port: ", this.port);
    });
  }
}

module.exports = Server;
