const Product = require("../models/Product");

const product = {
  content: (req, res) => {
    Product.find({}, "title imagexs price category", (err, products) => {
      if (err) {
        res.status(500).json({
          message: "not good",
        });
      } else {
        res.json(products);
      }
    });
  },

  home: (req, res) => {
    Product.find(
      { category: req.query.category },
      "title imagexs price category"
    )
      .limit(4)
      .exec((err, products) => {
        if (err) {
          res.status(500).json({
            message: "not good",
          });
        } else {
          res.json(products);
        }
      });
  },

  detail: (req, res) => {
    Product.findOne({ _id: req.query.id }, (err, product) => {
      if (err) {
        res.status(500).json({
          message: "not good",
        });
      } else {
        res.json(product);
      }
    });
  },

  sidebar: (req, res) => {
    Product.find({}, "category title imagexs", (err, products) => {
      if (err) {
        res.status(500).json({
          message: "not good",
        });
      } else {
        res.json(products);
      }
    });
  },

  search: (req, res) => {
    const searchterms = req.query.search.split(" ");
    const filter = {
      $or: [
        {
          title: {
            $in: searchterms.map(
              (element) => new RegExp(".*" + element + ".*", "i")
            ),
          },
        },
        {
          category: {
            $in: searchterms.map(
              (element) => new RegExp(".*" + element + ".*", "i")
            ),
          },
        },
      ],
    };

    Product.find(filter, (err, product) => {
      if (err) {
        res.status(500).json({
          message: "not good",
        });
      } else {
        res.json(product);
      }
    });
  },
};

module.exports = product;
