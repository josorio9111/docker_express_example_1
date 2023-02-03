const router = require("express").Router();
const busqueda = require("../controllers/buscar.controller");

router.get("/:coleccion/:termino", busqueda.buscar);

module.exports = router;
