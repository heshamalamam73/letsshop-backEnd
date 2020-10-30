import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  brand: { type: String },
  price: { type: Number },
  category: { type: String },
  countInStock: { type: Number },
  discription: { type: String },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
});
const productModel = mongoose.model("Product", productSchema);
export default productModel;
