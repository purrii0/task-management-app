const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = 3000;

const cors = require("cors");
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((e) => {
    console.log(`Error Connecting to Database Err: ${e}`);
  });

const userRoute = require("./routes/user");
const listRoute = require("./routes/list");

app.use("/user", userRoute);

app.use("/list", listRoute);

app.listen(port, () => console.log(`Listening to port: ${port}`));
