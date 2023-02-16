const jwt = require("jsonwebtoken");
const models = require('../models');

const Usuarios = models.usuarios;

const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.JWTKey,
      { expiresIn: "24h" },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validarJWT = async (token) => {
  try {
    if (token.length < 10) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.JWTKey);
    const usuario = await Usuarios.findById(id);
    if (!usuario) {
      return null;
    }
    // Verificar el Estado
    if (!usuario.estado) {
      return null;
    }
    return usuario;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { generarJWT, validarJWT };
