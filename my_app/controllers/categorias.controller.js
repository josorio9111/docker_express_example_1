const { response } = require("express");
const models = require("../models");
const Categorias = models.categorias;
// const { Schema } = require("mongoose");

exports.create = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categorias.findOne({ nombre });
  if (categoriaDB) {
    return res
      .status(400)
      .json({ message: `La categoria ${nombre} ya existe` });
  }
  const data = {
    nombre,
    usuario: req.usuario.id,
  };
  try {
    const categoria = new Categorias(data);
    await categoria.save();
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.findAll = async (req, res = response) => {
  const { limite = 5, desde = 0, q = "" } = req.query;
  const condition = {
    estado: true,
    nombre: { $regex: new RegExp(q.toUpperCase()), $options: "i" },
  };

  try {
    const [total, categorias] = await Promise.all([
      Categorias.countDocuments({ estado: true }),
      Categorias.find(condition)
        .populate("usuario", "nombre")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);
    res.status(200).json({ total, categorias });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.findOne = async (req, res = response) => {
  const { id } = req.params;
  try {
    const categoriaDB = await Categorias.findById(id).populate(
      "usuario",
      "nombre"
    );
    res.status(200).json(categoriaDB);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.update = async (req, res = response) => {
  const { estado, usuario, ...data } = req.body;
  const { id } = req.params;
  data.usuario = req.usuario.id;
  // Si viene lo actualizo o sino lo dejo igual
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  try {
    const categoria = await Categorias.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.destroy = async (req, res = response) => {
  const { id } = req.params;
  try {
    const categoria = await Categorias.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
