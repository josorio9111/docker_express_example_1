const router = require("express").Router();
const controller = require("../controllers/index.controller.js");

module.exports = router.get("/", controller.index);
