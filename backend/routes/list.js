const express = require("express");
const listRoute = express.Router();
const { create, task } = require("../controllers/list")

listRoute.post("/create", create);
listRoute.post("/:listid/task", create);

module.exports = listRoute;