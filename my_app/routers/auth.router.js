const router = require("express").Router();
const { check } = require("express-validator");
const authController = require("../controllers/auth.controller.js");
const { validarCampos, validarJWT } = require("../middlewares");

router.get(
  "/", validarJWT, authController.renovarToken
);

router.post(
  "/login",
  [
    check("email", "No es un email válido").isEmail(),
    check("password", "El password es obligatorio").notEmpty(),
    check("password", "El password debe tener 6 letras").isLength({
      min: 6,
    }),
    // check("email").custom(emailExiste),
    validarCampos,
  ],
  authController.login
);

router.post(
  "/google",
  [
    check("id_token", "El id_token es obligatorio").notEmpty(),
    validarCampos
  ],
  authController.googleSign
);

module.exports = router;
