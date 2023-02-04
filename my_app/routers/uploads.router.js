const router = require("express").Router();
const { check } = require("express-validator");
const upload = require("../controllers/uploads.controller");
const { coleccionesPermitidas } = require("../helpers");
const { validarCampos, validarArchivo } = require("../middlewares");

router.post("/", validarArchivo, upload.cargarArchivos);

router.put(
  "/:coleccion/:id",
  [
    check("id", "No es un Id de Mongo").isMongoId(),
    check("coleccion").custom((c) => coleccionesPermitidas(c, ["usuarios", "productos"])),
    validarArchivo,
    validarCampos,
  ],
  // upload.actualizarImagen
  upload.actualizarImagenCloudinary
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "No es un Id de Mongo").isMongoId(),
    check("coleccion").custom((c) => coleccionesPermitidas(c, ["usuarios", "productos"])),
    validarCampos,
  ],
  upload.mostrarImagen
);

module.exports = router;
