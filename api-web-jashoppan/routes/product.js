const express = require("express");
const router = express.Router();
const product = require("../controllers/product");

/* GET home page. */

router.get("/detail", product.detail);

router.get("/content", product.content);

module.exports = router;
