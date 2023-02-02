const models = require("../models");
const Usuarios = models.usuarios;

const esRoleValido = async (role = "") => {
  const Role = models.roles;
  const existeRol = await Role.findOne({ nombre: role });
  if (!existeRol) {
    throw new Error(`El rol no existe: ${role}`);
  }
};

const emailExiste = async (email = "") => {
  const existeEmail = await Usuarios.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo ya existe: ${email}`);
  }
};

const idExiste = async (id = "") => {
  const existeId = await Usuarios.findById(id);
  if (!existeId) {
    throw new Error(`El id no existe: ${id}`);
  }
};

module.exports = { esRoleValido, emailExiste, idExiste };
