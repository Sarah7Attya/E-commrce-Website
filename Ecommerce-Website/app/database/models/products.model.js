const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
   {
      title: { type: String, required: true, unique: true, trim: true },
      desc: { type: String, required: true, unique: true, trim: true },
      img: { type: String, trim: true },
      categories: { type: Array, required: true, trim: true },
      size: {
         type: Array,
         required: true,
         trim: true,
      },
      price: { type: Number, required: true, trim: true },
   },
   { timestamps: true }
);

const product = mongoose.model("product", productSchema);
module.exports = product;
