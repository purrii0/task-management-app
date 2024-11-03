const express = require("express");
const listRoute = express.Router();
const { create, task, update, deleteTask, addCollabrator, deleteCollabrator } = require("../controllers/list")
const auth = require("../auth/protectRoute")

listRoute.post("/create", auth, create);
listRoute.post("/:listid/task", auth, task);
listRoute.put("/:listid/task/:taskid", auth, update);
listRoute.delete("/:listid/task/:taskid", auth, deleteTask);
listRoute.post("/:listid/collabrator", auth, addCollabrator);
listRoute.delete("/:listid/collabrator/:userid", auth, deleteCollabrator);

module.exports = listRoute;