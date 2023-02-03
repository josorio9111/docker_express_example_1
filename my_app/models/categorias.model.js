const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nombre: {
        type: String,
        required: [true, "El nombre de la categoria es obligatio"],
        unique: true,
      },
      estado: {
        type: Boolean,
        default: true,
        required: [true, "El estado es obligatio"],
      },
      usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El usuario es obligatorio"],
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, estado, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("Categoria", schema);
};
