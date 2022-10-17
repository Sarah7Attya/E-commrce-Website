const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const userModel = require("../database/models/user.model");

class Auth {
   static verifyToken = async (req, res, next) => {
      try {
         const token = req.header("Authorization").replace("Bearer ", "");
         const decodedToken = jwt.verify(token, process.env.jwtKey); // {_id: '564646', iat: 654654}
         const user = await userModel.findOne({
            _id: decodedToken._id,
            "tokens.token": token,
         });
         if (!user) throw new Error("Token is not Valid!");
         req.user = user;
         req.token = token;
         next();
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Unauthorized!",
         });
      }
   };
   static verifyAuthorization = async (req, res, next) => {
      this.verifyToken(req, res, () => {
         if (req.user._id == req.params.id || req.user.isAdmin) {
            next();
         } else {
            res.status(500).send({
               apiStatus: false,
               message: "You are not allow to do that!",
            });
         }
      });
   };
   static verifyAdmin = async (req, res, next) => {
      this.verifyToken(req, res, () => {
         if (req.user.isAdmin) {
            next();
         } else {
            res.status(500).send({
               apiStatus: false,
               message: "You are not Admin",
            });
         }
      });
   };
}

module.exports = Auth;
