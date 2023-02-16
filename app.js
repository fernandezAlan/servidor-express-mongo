const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/postRouter");
const cors = require("cors");

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  session({
    secret: "fernandezkey", // una clave secreta para la sesión
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRoutes);
app.use("/post", postRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("connection to database");
  /*
    userModel
      .create({
        name: "alan!",
      })
      .then((user) => {
        console.log("user created:", user);
      })
      .catch((error) => {
        console.log("error at created user", error);
      });
  })
  .catch((err) => {
    console.log("error_database:", err);
    */
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
