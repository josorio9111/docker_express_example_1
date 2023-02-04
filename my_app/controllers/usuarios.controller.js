const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const models = require("../models");

const Usuarios = models.usuarios;
const Roles = models.roles;

exports.create = async (req = request, res = response) => {
  const { nombre, email, password, role } = req.body;
  const usuario = new Usuarios({ nombre, email, password, role });

  // Encriptar password
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  try {
    const data = await usuario.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req = request, res = response) => {
  const { limite = 5, desde = 0, q = "" } = req.query;
  const condition = {
    estado: true,
    nombre: { $regex: new RegExp(q), $options: "i" },
  };

  try {
    const [total, usuarios] = await Promise.all([
      Usuarios.countDocuments({ estado: true }),
      Usuarios.find(condition).skip(Number(desde)).limit(Number(limite)),
    ]);
    res.status(200).send({ total, usuarios });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const usuario = await Usuarios.findById(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req = request, res = response) => {
  const idParam = req.params.id;
  const { password, google, ...data } = req.body;

  // Si viene el password lo actulizo y lo encripto
  if (password) {
    const salt = bcrypt.genSaltSync();
    data.password = bcrypt.hashSync(password, salt);
  }
  // Si viene el role lo actulizo o sino lo dejo igual
  if (data.role) {
    const existeRol = await Roles.findOne({ role: data.role });
    if (!existeRol) {
      return res.status(401).json({
        message: `No existe un rol con ese nombre: ${data.role}`
      });
    }
  }
  // Si viene un email lo actulizo o sino lo dejo igual
  if (data.email) {
    const existeEmail = await Roles.findOne({ email: data.email });
    if (!existeEmail) {
      return res.status(401).json({
        message: `No existe un email con ese nombre: ${data.email}`
      });
    }
  }

  try {
    const usuario = await Usuarios.findByIdAndUpdate(idParam, data, {
      new: true,
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async (req = request, res = response) => {
  // findByIdAndDelete
  try {
    const idParam = req.params.id;
    const usuario = await Usuarios.findByIdAndUpdate(
      idParam,
      { estado: false },
      { new: true } // muestra el nuevo valor del usuario
    );
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
