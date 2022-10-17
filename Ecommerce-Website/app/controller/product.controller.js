const productModel = require("../database/models/products.model");
const path = require("path");
const fs = require("fs");

class Product {
   static addNew = async (req, res) => {
      try {
         req.body.img = req.file.path;
         req.body.img = req.body.img.replace("public\\", '');
         req.body.categories = req.body.categories.split(" ");
         req.body.size = req.body.size.split(" ");
         const newProduct = new productModel(req.body);
         await newProduct.save();
         res.status(200).send({
            apiStatus: true,
            data: { newProduct, img: req.file },
            message: "New Product has been Added successfully",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Adding Product has been failed!!",
         });
      }
   };
   static getSingleProduct = async (req, res) => {
      try {
         const product = await productModel.findById(req.params.id);
         res.status(200).send({
            apiStatus: true,
            data: product,
            message: "Product Data - Successful Process",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Product Data Error!!",
         });
      }
   };
   static updateProduct = async (req, res) => {
      try {
         const updateProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            {
               $set: req.body,
            },
            { new: true }
         );
         res.status(200).send({
            apiStatus: true,
            data: updateProduct,
            message: "Product has been Updated successfully",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Updating Product has been failed!!",
         });
      }
   };
   static deleteProduct = async (req, res) => {
      try {
         await productModel.findByIdAndDelete(req.params.id);
         res.status(200).send({
            apiStatus: true,
            message: "Product has been deleted successfully",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Deleting Product has been failed!!",
         });
      }
   };
   static getProducts = async (req, res) => {
      try {
         const qCategory = req.query.category;
         let products;
         if (qCategory) {
            products = await productModel.find({
               categories: {
                  $in: [qCategory],
               },
            });
         } else {
            products = await productModel.find();
         }
         res.status(200).send({
            apiStatus: true,
            data: products,
            message: "Get Products - Successful Process",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Get Products - Error!!",
         });
      }
   };
}

module.exports = Product;
