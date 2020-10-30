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

const app = express();
app.use(bodyParser.json());
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

app.use("/api/users", userRoute);
app.use("/api/products", producRoute);

// app.get("/api/products/:id", (req, res) => {
//   const productId = req.params.id;
//   const Product = data.products.find((x) => x._id === productId);
//   if (Product) {
//     res.send(Product);
//   } else {
//     res.status(404).send({ msg: "Product Not Found" });
//   }
// });
app.listen(5000, () => {
  console.log("server started at port 5000 ");
});
