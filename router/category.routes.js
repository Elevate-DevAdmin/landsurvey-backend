const express = require("express");
const { readCategory } = require("../controller/category.controller");
const route = express.Router();

route.get("/", readCategory)


module.exports = route