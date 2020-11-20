const jwt = require("jsonwebtoken");
const User = require("../models/User");

function authentication(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  const decodedToken = jwt.verify(token, "dev");

  if (!decodedToken) {
    res.status(401).json({ message: "Merci de vous connecter" });
    return;
  }
  User.findOne({ _id: decodedToken.id }, (err, user) => {
    if (err) {
      res.status(500).json({
        message: "Une erreur s'est produite. Veuillez réessayer",
      });
    } else if (!user) {
      res.status(401).json({ message: "Merci de vous connecter" });
    } else {
      req.user = user;
      next();
    }
  });
}

module.exports = authentication;
