const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.subirArchivo = (
  files,
  extenValidas = ["png", "jpg", "jpeg", "json"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    //Validar Extensiones
    if (!extenValidas.includes(extension)) {
      return reject(`Extension ${extension}  no permitida - ${extenValidas}`);
    }
    //   console.log(extension);
    const nombreTmp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTmp);

    archivo.mv(uploadPath, (error) => {
      if (error) {
        return reject(error);
      }
      resolve(nombreTmp);
    });
  });
};
