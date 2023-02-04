const models = require("../models");
const Usuarios = models.usuarios;
const Categorias = models.categorias;
const Productos = models.productos;
const Role = models.roles;

const esRoleValido = async (role = "") => {
  const existeRol = await Role.findOne({ nombre: role });
  if (!existeRol) {
    throw new Error(`El rol no existe en la DB: ${role}`);
  }
};

const emailExiste = async (email = "") => {
  const existeEmail = await Usuarios.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo ya existe en la DB: ${email}`);
  }
};

const existeIdUsuario = async (id = "") => {
  const existeId = await Usuarios.findById(id);
  if (!existeId) {
    throw new Error(`El id de usuario no existe: ${id}`);
  }
};

const existeIdCategoria = async (id = "") => {
  const existeId = await Categorias.findById(id);
  if (!existeId) {
    throw new Error(`No existe una categoria con este id: ${id}`);
  }
};

const existeIdProducto = async (id = "") => {
  const existeId = await Productos.findById(id);
  if (!existeId) {
    throw new Error(`No existe una producto con este id: ${id}`);
  }
};

const coleccionesPermitidas = (c, permitidas = []) => {
  const existe = permitidas.includes(c);
  if (!existe) {
    throw new Error(`${c} no es una coleccion permitida: ${permitidas}`);
  }
  return true;
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeIdUsuario,
  existeIdCategoria,
  existeIdProducto,
  coleccionesPermitidas,
};
