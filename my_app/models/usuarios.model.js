module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nombre: {
        type: String,
        required: [true, "El nomobre es obligatorio"],
      },
      email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "El password es obligatorio"],
      },
      img: String,
      role: {
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: ["ADMIN_ROLE", "USER_ROLE"],
      },
      google: {
        type: Boolean,
        default: false,
      },
      estado: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, password, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("usuarios", schema);
};
