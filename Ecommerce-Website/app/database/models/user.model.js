const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
   {
      name: { type: String, required: true, trim: true },
      email: {
         type: String,
         required: true,
         trim: true,
         lowercase: true,
         unique: true,
         validate(value) {
            if (!validator.isEmail(value)) throw new Error("Invalid Email");
         },
      },
      password: { type: String, required: true, trim: true },
      age: { type: Number, min: 14, max: 120 },
      // type: {
      //    type: String,
      //    required: true,
      //    trim: true,
      //    lowercase: true,
      //    enum: ["user", "admin"],
      // },
      isAdmin: { type: Boolean, default: false },
      gender: {
         type: String,
         trim: true,
         lowercase: true,
         enum: ["male", "female"],
      },
      phone: {
         type: String,
         trim: true,
         validate(value) {
            if (!validator.isMobilePhone(value, "ar-EG"))
               throw new Error("Invalid Mobile Number");
         },
      },
      profileImage: { type: String, trim: true },
      isActive: { type: Boolean, default: false },
      tokens: [
         {
            token: {
               type: String,
               trim: true,
               required: true,
            },
         },
      ],
   },
   {
      timestamps: true,
   }
);

// Hashing Password Before Save
userSchema.pre("save", async function () {
   const user = this;
   if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 10);
   }
});

// Delete Password from Data
userSchema.methods.toJSON = function () {
   const user = this.toObject();
   delete user.password;
   delete user.__v;
   return user;
};

// Login Function
userSchema.statics.userLogin = async (email, password) => {
   const user = await User.findOne({ email });
   if (!user) throw new Error("Wronge Data");
   const isValid = await user.checkPass(password)
   if (!isValid) throw new Error("Wronge Data");
   return user;
};

// Token Function
userSchema.methods.genToken = async function () {
   const user = this;
   const token = jwt.sign({ _id: user._id }, process.env.jwtKey, {
      expiresIn: "2d",
   });
   user.tokens = user.tokens.concat({ token });
   await user.save();
   return token;
};

// Check Password
userSchema.methods.checkPass = async function (currentPass) {
   const user = this;
   const isValid = await bcrypt.compare(currentPass, user.password);
   return isValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
