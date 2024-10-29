const { Router } = require("express");
const userRoute = Router();
const { signup, signin } = require("../controllers/auth")

userRoute.post("/signup", signup);

userRoute.post("/signin", signin);

module.exports = userRoute