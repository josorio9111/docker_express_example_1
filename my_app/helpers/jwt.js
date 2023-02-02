const jwt = require("jsonwebtoken");

const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.JWTKey,
      {
        expiresIn: "24h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
