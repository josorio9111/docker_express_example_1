exports.crearRoles = (roles) => {
  const ROL = roles;
  const arrayRoles = ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"];

  arrayRoles.map((e) => {
    let rol = new ROL({
      nombre: e,
    });
    ROL.findOne({ nombre: e })
      .then((data) => {
        if (!data) {
          rol.save();
        }
      })
      .catch((error) => {});
  });
};
