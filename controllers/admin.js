const Admin = require("../models/Product");

const admin = {
  getProducts: (req, res) => {
    Admin.find({}, "title imagexs price category", (err, products) => {
      if (err) {
        res.status(500).json({
          message: "not good",
        });
      } else {
        res.json(products);
      }
    });
  },
  addProduct: (req, res) => {
    Admin.insertMany(
      {
        category: req.body.category,
        title: req.body.title,
        image: req.body.image,
        imagexs: req.body.imagexs,
        price: req.body.price,
      },

      (err) => {
        if (err) {
          res.status(500).json({
            message: "not good",
          });
        } else {
          res.json({
            message: "produit ajouté",
          });
        }
      }
    );
  },

  deleteProduct: (req, res) => {
    Admin.deleteOne(
      { _id: req.query._id },

      (err, products) => {
        if (err) {
          res.status(500).json({
            message: "not good",
          });
        } else {
          res.json({
            message: "produit supprimé",
          });
        }
      }
    );
  },
};

module.exports = admin;
