const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
      },
      precio: {
        type: Number,
        default: 0,
      },
      categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: [true, "La categoria es obligatoria"],
      },
      estado: {
        type: Boolean,
        default: true,
        require: true,
      },
      usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El usuario es obligatorio"],
      },
      descripcion: {
        type: String,
      },
      disponible: {
        type: Boolean,
        default: true,
      },
      img: {
        type: String,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, estado, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("Producto", schema);
};
