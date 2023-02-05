const { response, request } = require("express");
const { ObjectId } = require("mongoose").Types;
const colePermitidas = ["usuarios", "categorias", "productos", "roles"];
const models = require("../models");
const Usuario = models.usuarios;
const Categorias = models.categorias;
const Productos = models.productos;

exports.buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;
  if (!colePermitidas.includes(coleccion)) {
    return res.status(400).json({
      message: `Las colecciones permitidas son: ${colePermitidas}`
    });
  }
  switch (coleccion) {
    case "usuarios":
      exiteUsuario(termino, res);
      break;
    case "categorias":
      existeCategoria(termino, res);
      break;
    case "productos":
      exiteProducto(termino, res);
      break;
    default:
      res.status(500).json({ message: "Hacer" });
  }
};

const exiteUsuario = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino);
  let result;
  if (isMongoId) {
    result = await Usuario.findById(termino);
  } else {
    const regexp = new RegExp(termino, "i");
    result = await Usuario.find({
      $or: [{ nombre: regexp, email: regexp }],
      $and: [{ estado: true }],
    });
  }
  return res.status(200).json({
    results: result ?? [],
  });
};

const existeCategoria = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino);
  let result;
  if (isMongoId) {
    result = await Categorias.findById(termino).populate("usuario", "nombre");
  } else {
    const regexp = new RegExp(termino, "i");
    result = await Categorias.find({ nombre: regexp, estado: true }).populate(
      "usuario",
      "nombre"
    );
  }
  return res.status(200).json({
    results: result ?? [],
  });
};

const exiteProducto = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino);
  let result;
  if (isMongoId) {
    result = await Productos.findById(termino)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");
  } else {
    const regexp = new RegExp(termino, "i");
    result = await Productos.find({ nombre: regexp, estado: true })
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");
  }
  return res.status(200).json({
    results: result ?? [],
  });
};
