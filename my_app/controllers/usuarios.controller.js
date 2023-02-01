const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const db = require("./app.comtroller");

const Usuarios = db.usuarios;

exports.create = async (req = request, res = response) => {
  const { nombre, email, password, role } = req.body;
  const usuario = new Usuarios({ nombre, email, password, role });

  // Encriptar password
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
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
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.findOne = async (req = request, res = response) => {
  const id = req.params.id;
  await Usuarios.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving Usuario with id=" + id,
      });
    });
};

exports.update = async (req = request, res = response) => {
  const idParam = req.params.id;
  const { password, google, email, ...resto } = req.body;

  // Si viene el password lo actulizo y lo encripto
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  await Usuarios.findByIdAndUpdate(idParam, resto)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.destroy = async (req = request, res = response) => {
  const idParam = req.params.id;

  // findByIdAndDelete
  await Usuarios.findByIdAndUpdate(idParam, { estado: false })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};
