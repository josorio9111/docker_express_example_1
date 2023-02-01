const mongoose = require("mongoose");
const dbConfig = require("../database/db.config.js");
const { crearRoles } = require("../helpers/crear-roles.helper.js");

mongoose.set("strictQuery", true);

mongoose.Promise = global.Promise;
const db = {};

db.url = dbConfig.url;
db.mongoose = mongoose;
db.example = require("../models/example.model.js")(mongoose); // Models
db.categorias = require("../models/categorias.model.js")(mongoose); // Models
db.productos = require("../models/productos.model.js")(mongoose); // Models
db.usuarios = require("../models/usuarios.model.js")(mongoose); // Models
db.roles = require("../models/roles.model.js")(mongoose); // Models
crearRoles(db.roles);

module.exports = db;
