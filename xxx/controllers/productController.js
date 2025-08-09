import mongoose from "mongoose";
import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const getData = await Product.find({});

    if (!getData) {
      return res.status(404).json({ message: "No Data" });
    }

    return res.status(200).json({ message: "Data is Fetched!", data: getData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, quantity, price, isOnSale, isPopular } =
      req.body;

    if (
      !name ||
      !description ||
      quantity === undefined ||
      price === undefined ||
      isOnSale === undefined ||
      isPopular === undefined
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newProduct = await Product.create({
      name,
      description,
      quantity,
      price,
      isOnSale,
      isPopular,
    });

    return res.status(201).json({ product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

// DELETE Product with validation
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product deleted successfully", data: deletedProduct });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

// UPDATE Product with validation
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};
