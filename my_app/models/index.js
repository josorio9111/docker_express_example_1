const mongoose = require("mongoose");
const dbConfig = require("../database/db.config.js");
const { crearRoles } = require("../helpers/crear-roles.helper.js");

mongoose.set("strictQuery", true);

mongoose.Promise = global.Promise;
const app = {};

app.url = dbConfig.url;
app.mongoose = mongoose;
app.example = require("./example.model.js")(mongoose); // Models
app.categorias = require("./categorias.model.js")(mongoose); // Models
app.productos = require("./productos.model.js")(mongoose); // Models
app.usuarios = require("./usuarios.model.js")(mongoose); // Models
app.roles = require("./roles.model.js")(mongoose); // Models
crearRoles(app.roles);

module.exports = app;
