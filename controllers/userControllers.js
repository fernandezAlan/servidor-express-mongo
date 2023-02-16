const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModels");
const register = (req, res) => {
  //console.log("register", req.body);
  const user = new UserModel(req.body);
  user.save((error) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      req.session.user = user;
      res.status(200).json(user);
    }
  });
};

const getUser = (req, res) => {
  //console.log("req", req.headers);
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  var decoded = jwt.verify(token, "secret");
  res.json({ user: decoded });
};
module.exports = { register, getUser };
