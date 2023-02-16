const { expressjwt: jwt } = require("express-jwt");
const authMiddleware = jwt({ secret: "secret", algorithms: ["HS256"] });
module.exports = authMiddleware;
