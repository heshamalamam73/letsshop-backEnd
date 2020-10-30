import express from "express";
import Product from "../models/productModel.js";
import { getToken, isAdmin, isAuth } from "../util.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      discription: req.body.discription,
      countInStock: req.body.countInStock,
      category: req.body.category,
      numReviews: req.body.numReviews,
      brand: req.body.brand,
      rating: req.body.rating,
    });
    const newProduct = await product.save();
    if (newProduct) {
      res
        .status(201)
        .send({ message: "new Product Created ", data: newProduct });
    } else {
      res
        .status(500)
        .send({ message: "error in creating product >> try again " });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });

    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.discription = req.body.discription;
      product.countInStock = req.body.countInStock;
      product.category = req.body.category;
      product.numReviews = req.body.numReviews;
      product.brand = req.body.brand;
      product.rating = req.body.rating;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(201)
          .send({ message: "Product Updated", data: updatedProduct });
      }
    } else {
      res
        .status(500)
        .send({ message: "error in creating product >> try again " });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.send("Error in loading product try again !! . ");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: "product removed " });
    } else {
      res.send("Error in deletion . ");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
