const mongoose = require('mongoose');
const dbConfig = require('../config/db.config.js');

mongoose.set('strictQuery', true);

// mongoose.Promise = global.Promise;
const db = {};

db.url = dbConfig.url;
db.mongoose = mongoose;
db.example = require("./example.model.js")(mongoose);

module.exports = db;