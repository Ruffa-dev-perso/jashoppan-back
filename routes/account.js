const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const authentication = require("../middleware/authentication");

/* GET home page. */
router.post("/create", user.create);

router.post("/login", user.login);

router.get("/profile", authentication, user.getProfileData);

router.put("/profile", authentication, user.edit);

router.get("/cart", authentication, user.getCart);

router.post("/cart", authentication, user.addToCart);

router.delete("/cart", authentication, user.deleteProduct);

module.exports = router;
