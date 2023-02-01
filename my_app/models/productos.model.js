module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
      },
      precioUni: {
        type: Number,
      },
      categoria: String,
      disponible: {
        type: Boolean,
        default: true,
      },
      usuario: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("productos", schema);
};
