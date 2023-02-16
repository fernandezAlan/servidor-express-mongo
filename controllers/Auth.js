const bcrypt = require("bcryptjs");
const User = require("../models/UserModels");
const jwt = require("jsonwebtoken");
function authUser(req, res) {
  const { email, password } = req.body;
  console.log("login", { email, password });
  User.findOne({ email }, function (err, user) {
    if (err) return res.status(500).send("Error de servidor");
    if (!user) return res.status(401).send("Credenciales inválidas");

    bcrypt.compare(password, user.password, function (err, coincide) {
      if (err) return res.status(500).send("Error de servidor");
      if (!coincide) return res.status(401).send("Credenciales inválidas");

      // Autenticación exitosa
      // Generar token de sesión y enviar respuesta
      //cambiar 'secret' por un string secreto en un archivo .env
      const token = jwt.sign({ username: user.email }, "secret", {
        algorithm: "HS256",
      });
      res.json({ token });
      //req.session.user = user;
      /*
      req.session.regenerate((error) => {
        if (error) console.log("error:", error);
        req.session.user = user;
        console.log("session", req.session.user);
        req.session.save((error) => {
          if (error) {
            console.log("error:", error);
            res.status(500).send("server error");
          } else {
            res.status(200).send("ok");
          }
        });
      });
      */
    });
  });
}
module.exports = authUser;
