const express = require("express");
const router = express.Router();
const home = require("../controllers/product");

/* GET home page. */

router.get("/home", home.home);

router.get("/sidebar", home.sidebar);

router.get("/search", home.search);

module.exports = router;
