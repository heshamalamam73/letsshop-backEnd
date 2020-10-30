import express from "express";
import config from "./config.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
const mongodbUrl = config.MONGODB_URL;
import userRoute from "./routes/userRoute.js";
import producRoute from "./routes/productRoute.js";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

if (process.env.NODE_ENV) {
  app.use(express.static("front-end/build"));
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
