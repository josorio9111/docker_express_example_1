const { check } = require("express-validator");
const router = require("express").Router();
const usuarios = require("../controllers/usuarios.controller.js");

const {
  validarCampos,
  validarJWT,
  isAdminRole,
  tieneRole,
} = require("../middlewares");
const {
  esRoleValido,
  emailExiste,
  idExiste,
} = require("../helpers/db.validator.js");

// Create a new usuarios
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "El password debe tener 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExiste),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuarios.create
);

// // Retrieve all usuarios
router.get("/", usuarios.findAll);

// // Retrieve a single usuarios with id
router.get(
  "/:id",
  [
    check("id", "No es un Id de Mongo").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuarios.findOne
);

// // Update a usuarios with id
router.put(
  "/:id",
  [
    check("id", "No es un Id de Mongo").isMongoId(),
    check("id").custom(idExiste),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuarios.update
);

// Delete a usuarios with id
router.delete(
  "/:id",
  [
    validarJWT,
    // isAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un Id de Mongo").isMongoId(),
    check("id", "No exite el ID").custom(idExiste),
    validarCampos,
  ],
  usuarios.destroy
);

module.exports = router;
