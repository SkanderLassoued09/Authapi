const express = require("express");
const { protect } = require("../Middlewares/auth");
const route = express.Router();
const { getPrivateData } = require("../Controller/private");
route.route("/").get(protect, getPrivateData);
module.exports = route;
