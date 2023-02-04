const path = require("path");
const fs = require("fs");
const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const Usuario = require("../models").usuarios;
const Productos = require("../models").productos;

exports.cargarArchivos = async (req = request, res = response) => {
  try {
    const pathArchivo = await subirArchivo(req.files, ["js"], "javascript");
    res.json({ pathArchivo });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.actualizarImagen = async (req = request, res = response) => {
  try {
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
      case "productos":
        modelo = await Productos.findById(id);
        if (!modelo) {
          return res.status(400).json({ message: `No existe un producto con el id: ${id}` });
        }
        break;
      case "usuarios":
        modelo = await Usuario.findById(id);
        if (!modelo) {
          res.status(400).json({ message: `No existe un usuario con el id: ${id}` });
          return;
        }
        break;
    }
    //Limpiar imagenes de las colecciones
    if (modelo.img) {
      const pathImg = path.join(__dirname, "../uploads/", coleccion, modelo.img);
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    }

    const pathArchivo = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = pathArchivo;
    await modelo.save();
    res.status(200).json(modelo);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};


exports.mostrarImagen = async (req, res = response) => {
  try {
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
      case "productos":
        modelo = await Productos.findById(id);
        if (!modelo) {
          return res.status(400).json({ message: `No existe un producto con el id: ${id}` });
        }
        break;
      case "usuarios":
        modelo = await Usuario.findById(id);
        if (!modelo) {
          res.status(400).json({ message: `No existe un usuario con el id: ${id}` });
          return;
        }
        break;
    }
    if (modelo.img) {
      const pathImg = path.join(__dirname, "../uploads/", coleccion, modelo.img);
      if (fs.existsSync(pathImg)) {
        // fs.unlinkSync(pathImg);
        return res.status(200).sendFile(pathImg);
      }
    }
    const pathAsset = path.join(__dirname, "../assets/", 'no-image.jpg');
    res.status(200).sendFile(pathAsset);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}