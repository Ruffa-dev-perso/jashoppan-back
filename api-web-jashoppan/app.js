const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("./middleware/cors");

const indexRouter = require("./routes/index");
const accountRouter = require("./routes/account");
const productRouter = require("./routes/product");
const adminRouter = require("./routes/admin");

const app = express();

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://groupbocal:bocal2020@projetbackend.hyr4w.mongodb.net/jashoppan?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
  console.log("DataBase connection successful");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors.handle);

app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/product", productRouter);
app.use("/admin", adminRouter);

module.exports = app;
