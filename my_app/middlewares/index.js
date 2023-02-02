const validarCampos = require("./validar-campos.js");
const validarJWT = require("./validar-jwt.js");
const validaRoles = require("./validar-roles.js");

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validaRoles,
};
