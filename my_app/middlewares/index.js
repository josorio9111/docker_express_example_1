const validarCampos = require("./validar-campos.js");
const validarJWT = require("./validar-jwt.js");
const validaRoles = require("./validar-roles.js");
const validarArchivo = require('./validar-archivo');

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validaRoles,
  ...validarArchivo
};
