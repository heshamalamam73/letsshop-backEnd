import express from "express";
import data from "./data";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose";
const mongodbUrl = config.MONGODB_URL;
import userRoute from "./routes/userRoute.js";
import producRoute from "./routes/productRoute";
import bodyParser from "body-parser";
dotenv.config();
require("dotenv").config({ path: "MONGODB_URL" });

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("api works good");
});
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log(error));

app.use("/api/users", userRoute);
app.use("/api/products", producRoute);

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`server started at port ${Port}`);
});
