const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const connectDB = require('./server/database/connection');

const app = express();
dotenv.config({ path : 'config.env' });

//log request
app.use(morgan('tiny'));

//cors
app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// mongodb connection
connectDB();

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));


// load routers
app.use('/', require('./server/routes/router'))

const port = process.env.PORT || 3000 ;

app.listen(port, () => console.log(`Server running on port ${port}`));
