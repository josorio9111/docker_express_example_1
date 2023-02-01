module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nombre: {
        type: String,
        required: [true, "El nombre de la categoria es obligatio"],
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

  return mongoose.model("categorias", schema);
};
