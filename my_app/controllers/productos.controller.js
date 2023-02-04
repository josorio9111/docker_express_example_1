const { response } = require("express");
const models = require("../models");
const Productos = models.productos;
const Categorias = models.categorias;

exports.create = async (req, res = response) => {
  const { usuario, estado, disponible, ...data } = req.body;
  data.usuario = req.usuario.id;
  data.nombre = data.nombre.toLowerCase();
  const productoDB = await Productos.findOne({ nombre: data.nombre });
  if (productoDB) {
    return res.status(400).json({
      message: `La producto ${productoDB.nombre} ya existe`
    });
  }
  try {
    const producto = new Productos(data);
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res = response) => {
  const { limite = 5, desde = 0, q = "" } = req.query;
  const condition = {
    estado: true,
    nombre: { $regex: new RegExp(q), $options: "i" },
  };

  try {
    const [total, productos] = await Promise.all([
      Productos.countDocuments({ estado: true }),
      Productos.find(condition)
        .populate("usuario", "nombre")
        .populate("categoria", "nombre")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);
    res.status(200).send({ total, productos });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.findOne = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const categoriaDB = await Productos.findById(id)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");
    res.status(200).json(categoriaDB);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req = request, res = response) => {
  const { estado, usuario, ...data } = req.body;
  const { id } = req.params;
  data.usuario = req.usuario.id;
  // Si viene lo actualizo o sino lo dejo igual
  if (data.nombre) {
    data.nombre = data.nombre.toLowerCase();
  }
  // Si viene lo actualizo o sino lo dejo igual
  if (data.categoria) {
    const categoria = await Categorias.findById(data.categoria);
    if (!categoria) {
      return res.status(401).json({
        message: `No existe una categoria con el id: ${data.categoria}`,
      });
    }
  }

  try {
    const producto = await Productos.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const producto = await Productos.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    )
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
