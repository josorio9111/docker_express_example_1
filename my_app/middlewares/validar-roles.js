const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      message: "Se quiere verificar el role sin validar el token"
    });
  }
  const { role, nombre } = req.usuario;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      message: `${nombre} no es administrador`
    });
  }
  next();
};

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        message: "Se quiere verificar el role sin validar el token"
      });
    }
    const { role } = req.usuario;
    if (!roles.includes(role)) {
      return res.status(401).json({
        message: `Solo para ${roles}`
      });
    }
    next();
  };
};

module.exports = { isAdminRole, tieneRole };
