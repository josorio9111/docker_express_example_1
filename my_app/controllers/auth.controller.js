const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const app = require("../models/index.js");
const { generarJWT } = require("../helpers/jwt.js");

const Usuarios = app.usuarios;

exports.login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // Verificar si existe el correo
    const usuario = await Usuarios.findOne({ email });
    if (!usuario) {
      res.status(400).json({ message: "El usuario/password no son correctos--correo" });
      return;
    }

    // Si el usuario esta activo
    if (!usuario.estado) {
      res.status(400).json({ message: "El usuario no esta activo" });
      return;
    }

    // Verificar la password
    const verificar = bcryptjs.compareSync(password, usuario.password);
    if (!verificar) {
      res.status(400).json({ message: "El usuario/password no son correctos--password" });
      return;
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};
