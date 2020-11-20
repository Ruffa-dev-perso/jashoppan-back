const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");

const user = {
  create: (req, res) => {
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      birthday: req.body.birthday,
      password: bcrypt.hashSync(req.body.password, 10),
      address: req.body.address,
      postcode: req.body.postcode,
      city: req.body.city,
      phone: req.body.phone,
    });
    newUser.save((error) => {
      if (error) {
        res.status(500).json({
          message: "Erreur",
        });
      } else {
        res.json({
          message: "compte créé ",
        });
      }
    });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(500).json({
          message: "Erreur",
        });
      } else if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({ id: user._id }, "dev", { expiresIn: "24h" });
          res.json({ message: "Connexion réussie", token });
        } else {
          res.status(401).json({ message: "Erreur" });
        }
      } else {
        res.status(401).json({ message: "Erreur" });
      }
    });
  },
  getProfileData: (req, res) => {
    res.json(req.user);
  },

  edit: (req, res) => {
    req.user.firstname = req.body.firstname
      ? req.body.firstname
      : req.user.firstname;
    req.user.lastname = req.body.lastname
      ? req.body.lastname
      : req.user.lastname;
    req.user.email = req.body.email ? req.body.email : req.user.email;
    req.user.birthday = req.body.birthday
      ? req.body.birthday
      : req.user.birthday;
    req.user.password = req.body.password
      ? bcrypt.hashSync(req.body.password, 10)
      : req.user.password;
    req.user.address = req.body.address ? req.body.address : req.user.address;
    req.user.postcode = req.body.postcode
      ? req.body.postcode
      : req.user.postcode;
    req.user.city = req.body.city ? req.body.city : req.user.city;
    req.user.phone = req.body.phone ? req.body.phone : req.user.phone;

    req.user.save((error) => {
      if (error) {
        res.status(500).json({
          message: "Erreur",
        });
      } else {
        res.json({ message: "Utilisateur modifié" });
      }
    });
  },
  getCart: (req, res) => {
    res.json(req.user.cart);
  },

  addToCart: (req, res) => {
    Product.findOne(
      { _id: req.body.id },
      "title price imagexs",
      (error, product) => {
        if (error || !product) {
          res.status(500).json({
            message: "Erreur",
          });
        } else {
          req.user.cart.push({
            productId: req.body.id,
            quantity: req.body.quantity,
            name: product.title,
            price: product.price,
            imagexs: product.imagexs,
          });
        }
        req.user.save((error) => {
          if (error) {
            res.status(500).json({
              message: "Erreur",
            });
          } else {
            res.json({ message: "Produit ajouté" });
          }
        });
      }
    );
  },
  deleteProduct: (req, res) => {
    const deleteIndex = req.user.cart.findIndex(
      (element) => element.productId === req.query.productId
    );
    req.user.cart.splice(deleteIndex, 1);
    req.user.save((error) => {
      if (error) {
        res.status(500).json({
          message: "Erreur",
        });
      } else {
        res.json({ message: "Produit supprimer" });
      }
    });
  },
};

module.exports = user;
