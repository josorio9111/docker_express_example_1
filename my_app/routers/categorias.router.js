const { check } = require("express-validator");
const router = require("express").Router();
const categorias = require("../controllers/categorias.controller");
const { existeIdCategoria } = require("../helpers/db.validator");
const { validarCampos, validarJWT, isAdminRole } = require("../middlewares");

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  categorias.create
);

router.get("/", categorias.findAll);

router.get(
  "/:id",
  [
    check("id", "No es un Id de Mongo").isMongoId(),
    check("id").custom(existeIdCategoria),
    validarCampos,
  ],
  categorias.findOne
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un Id de Mongo").isMongoId(),
    check("id").custom(existeIdCategoria),
    validarCampos,
  ],
  categorias.update
);

router.delete(
  "/:id",
  [
    validarJWT,
    isAdminRole,
    check("id", "No es un Id de Mongo").isMongoId(),
    check("id").custom(existeIdCategoria),
    validarCampos,
  ],
  categorias.destroy
);

module.exports = router;
