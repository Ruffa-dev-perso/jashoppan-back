const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");

/* GET home page. */

router.get("/", admin.getProducts);

router.post("/", admin.addProduct);

router.delete("/", admin.deleteProduct);

module.exports = router;
