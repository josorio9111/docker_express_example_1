module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nombre: {
        type: String,
        required: [true, "El rol es obligatorio"],
        unique: true,
      },
    },
    { timestamps: false }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("Role", schema);
};
