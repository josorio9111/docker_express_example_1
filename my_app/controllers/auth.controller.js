const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const models = require("../models");
const { generarJWT } = require("../helpers/jwt.js");
const { googleVerify } = require("../helpers/google-verify");

const Usuarios = models.usuarios;

exports.login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // Verificar si existe el correo
    const usuario = await Usuarios.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        message: "El usuario/password no son correctos--correo"
      });
    }
    // Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({ message: "El usuario no esta activo" });
    }
    // Verificar la password
    const verificar = bcryptjs.compareSync(password, usuario.password);
    if (!verificar) {
      return res.status(400).json({
        message: "El usuario/password no son correctos--password"
      });
    }
    // Generar el JWT
    const token = await generarJWT(usuario.id);
    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

exports.googleSign = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { nombre, email, img } = await googleVerify(id_token);
    let usuario = await Usuarios.findOne({ email });
    if (!usuario) {
      usuario = new Usuarios({
        nombre,
        email,
        password: ":P)",
        img,
        google: true,
      });
      usuario.save();
    }
    //Verificar el estado del usuario
    if (!usuario.estado) {
      return res.status(400).json({ message: "El usuario no esta activo" });
    }
    // Generar el JWT
    const token = await generarJWT(usuario.id);
    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Token no es reconozido" });
  }
};

exports.renovarToken = async (req, res) => {
  const { usuario } = req;
  // Generar el JWT
  const token = await generarJWT(usuario.id);
  res.json({ usuario, token });
}
