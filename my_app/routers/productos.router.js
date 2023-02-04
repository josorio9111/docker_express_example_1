const router = require("express").Router();
const { check } = require("express-validator");
const { validarCampos, validarJWT, isAdminRole } = require("../middlewares");
const productos = require("../controllers/productos.controller");
const {
  existeIdProducto,
  existeIdCategoria,
} = require("../helpers/db.validator.js");

router.get("/", productos.findAll);

router.get(
  "/:id",
  [
    check("id", "No es un Id de Mongo").isMongoId(),
    check("id").custom(existeIdProducto),
    validarCampos,
  ],
  productos.findOne
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("categoria", "La categoria es obligatoria").notEmpty(),
    check("categoria").custom(existeIdCategoria),
    validarCampos,
  ],
  productos.create
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un Id de Mongo").isMongoId(),
    check("id").custom(existeIdProducto),
    validarCampos
  ],
  productos.update
);

router.delete(
  "/:id",
  [
    validarJWT,
    isAdminRole,
    check("id", "No es un Id de Mongo").isMongoId(),
    check("id").custom(existeIdProducto),
    validarCampos
  ],
  productos.destroy
);

module.exports = router;
