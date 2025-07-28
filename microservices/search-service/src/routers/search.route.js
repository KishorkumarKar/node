const express = require("express");
const route = express.Router();
const { getSearchData } = require("../controllers/search.controller");
route.post("/list", getSearchData);
module.exports = route;
