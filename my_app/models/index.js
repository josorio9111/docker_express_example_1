const mongoose = require("mongoose");
const dbConfig = require("../database/db.config.js");
const { crearRoles } = require("../helpers/crear-roles.helper.js");

mongoose.set("strictQuery", true);

mongoose.Promise = global.Promise;
const models = {};

models.url = dbConfig.url;
models.mongoose = mongoose;
models.categorias = require("./categorias.model.js")(mongoose); // Models
models.productos = require("./productos.model.js")(mongoose); // Models
models.usuarios = require("./usuarios.model.js")(mongoose); // Models
models.roles = require("./roles.model.js")(mongoose); // Models
crearRoles(models.roles);

module.exports = models;
