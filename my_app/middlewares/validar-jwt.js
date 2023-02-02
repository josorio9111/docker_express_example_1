const { request, response } = require("express");
const jsonwebtoken = require("jsonwebtoken");
const Usuarios = require("../models").usuarios;

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ message: "No hay token" });
  }
  try {
    const { id } = jsonwebtoken.verify(token, process.env.JWTKey);
    const usuario = await Usuarios.findById(id);
    //Verificar usuario
    if (!usuario) {
      return res.status(401).json({ message: "usuario no existe en la DB" });
    }
    // Verificar el Estado
    if (!usuario.estado) {
      return res.status(401).json({ message: "usuario eliminado" });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = { validarJWT };
