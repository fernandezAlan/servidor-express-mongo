const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

// Middleware para encriptar la contraseña antes de guardarla
UserSchema.pre("save", function (next) {
  const user = this;

  // Si la contraseña no ha sido modificada, pasar al siguiente middleware

  if (!user.isModified("password")) {
    return next();
  }

  // Generar un hash para la contraseña
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // Reemplazar la contraseña original con la contraseña encriptada
      user.password = hash;
      next();
    });
  });
});
module.exports = mongoose.model("User", UserSchema);
