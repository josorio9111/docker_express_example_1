const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnectt } = require("../database/db.connect");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      uploads: "/api/uploads",
      usuarioPath: "/api/usuarios",
      categoriaPath: "/api/categorias",
      productoPath: "/api/productos",
    };

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
    // FileUpload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true
      })
    );
  }

  routers() {
    //  api/auth
    this.app.use(this.path.auth, require("../routers/auth.router"));
    //  api/usuarios
    this.app.use(this.path.usuarioPath, require("../routers/usuarios.router"));
    // api/categorias
    this.app.use(this.path.categoriaPath, require("../routers/categorias.router"));
    // api/productos
    this.app.use(this.path.productoPath, require("../routers/productos.router"));
    // api/buscar
    this.app.use(this.path.buscar, require("../routers/buscar.router"));
    // api/uploads
    this.app.use(this.path.uploads, require("../routers/uploads.router"));
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
