const cartModel = require("../database/models/cart.model");

class Cart {
   static create = async (req, res) => {
      const newCART = new cartModel(req.body);
      try {
         const savedCART = await newCART.save();
         res.status(200).send({
            apiStatus: true,
            data: newCART,
            message: 'Cart has been created successfully'
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Cart Creation Failed!!",
         });
      }
   };
}

module.exports = Cart;
