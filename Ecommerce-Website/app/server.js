require('dotenv').config();
require("./database/connect");
const express = require('express');
const path = require('path')
const cors = require('cors')
const app = express();

const userRoutes = require('../routes/user.routes');
const productRoutes = require("../routes/product.routes");
const cartRoutes = require("../routes/cart.routes");

app.use(cors())
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/user',userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

module.exports = app;