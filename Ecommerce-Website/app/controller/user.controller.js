const userModel = require("../database/models/user.model");
const bcrypt = require("bcryptjs");

class User {
   static register = async (req, res) => {
      try {
         const user = userModel(req.body);
         await user.save();
         res.status(200).send({
            apiStatus: true,
            data: user,
            message: "User has been registered successfully",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "User Registration Failed",
         });
      }
   };
   static login = async (req, res) => {
      try {
         const user = await userModel.userLogin(
            req.body.email,
            req.body.password
         );
         const token = await user.genToken();
         res.status(200).send({
            apiStatus: true,
            data: { user, token },
            message: "User Logged in successfully",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "User login Failed",
         });
      }
   };
   static logout = async (req, res) => {
      try {
         req.user.tokens = [];
         await req.user.save();
         res.status(200).send({
            apiStatus: true,
            message: "Logged out successfully",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Logged out Error!!",
         });
      }
   };
   static editPassword = async (req, res) => {
      try {
         const isValid = await req.user.checkPass(req.body.currentPassword);
         if (!isValid) throw new Error("Invalid Password");
         req.user.password = req.body.newPassword;
         await req.user.save();
         res.status(200).send({
            apiStatus: true,
            data: req.user,
            message: "Password has been updated",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Password updating error",
         });
      }
   };
   static editUser = async (req, res) => {
      try {
         if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await req.user.save();
         }
         const invalidEdits = [
            "_id",
            "__v",
            "isActive",
            "isAdmin",
            "tokens",
            "token",
            "updatedAt",
            "createdAt",
         ];
         for (const property in req.body) {
            if (invalidEdits.includes(property)) {
               throw new Error("Property Error");
            } else {
               req.user[property] = req.body[property];
            }
         }
         await req.user.save();
         const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            {
               $set: req.body,
            },
            {
               new: true,
            }
         );
         res.status(200).send({
            apiStatus: true,
            data: updatedUser,
            message: "User has been updated successfully",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Edit Error",
         });
      }
   };
   static deleteUser = async (req, res) => {
      try {
         await userModel.findByIdAndDelete(req.params.id);
         res.status(200).send({
            apiStatus: false,
            message: "User has beed deleted successfully",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Deleting Error",
         });
      }
   };
   static getUserData = async (req, res) => {
      try {
         res.status(200).send({
            apiStatus: true,
            data: req.user,
            message: "User Data",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Getting User Data Error",
         });
      }
   };
   static getAllData = async (req, res) => {
      try {
         const users = await userModel.find();
         res.status(200).send({
            apiStatus: true,
            data: users,
            message: "Users Data",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Getting User Data Error",
         });
      }
   };
   static activateUser = async (req, res) => {
      try {
         if (req.user.isActive)
            throw new Error("This email is already activated");
         req.user.isActive = true;
         await req.user.save();
         res.status(200).send({
            apiStatus: true,
            message: "This email is activated successfully",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Activate email Error",
         });
      }
   };
   static activateWithoutUserAuth = async (req, res) => {
      try {
         const user = await userModel.userLogin(
            req.body.email,
            req.body.password
         );
         if (user.isActive) throw new Error("This email is already activated");
         user.isActive = true;
         await user.save();
         res.status(200).send({
            apiStatus: true,
            message: "This email is activated successfully",
         });
      } catch (e) {
         res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "Activate email Error - Without Auth",
         });
      }
   };
}

module.exports = User;
