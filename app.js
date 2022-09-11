const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const homeRoute = require("./routes/home");
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const cookieParser = require("cookie-parser");
const fileupload = require('express-fileupload')
const helmet = require("helmet");
const compression = require("compression");
const morgan = require('morgan')//for logging all requrest/

const app = express();
app.use(helmet());
app.use(compression());

app.use(bodyParser.json());
app.use(fileupload())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
app.use(cookieParser());

app.use("/ad1000", authRoute);
app.use("/ad1000", adminRoute);
app.use(homeRoute);

mongoose

  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DEFAULT_DATABASE}.a9z29aq.mongodb.net/?retryWrites=true&w=majority`)
  .then((result) => {
    app.listen(8000);
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
