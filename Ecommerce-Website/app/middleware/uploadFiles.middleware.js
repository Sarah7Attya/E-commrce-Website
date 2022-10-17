const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "public/imgs");
   },
   filename: function (req, file, cb) {
      const filename =
      Date.now() + path.extname(file.originalname).toLowerCase();
      cb(null, filename);
   },
});

const upload = multer({
   storage,
   fileFilter: function (req, file, cb) {
      const validExt = [".jpg", ".png"];
      for (const ext of validExt) {
         if (path.extname(file.originalname).toLowerCase().includes(ext)) {
            return cb(null, true);
         } else {
            return cb(new Error("Invalid ext"), null);
         }
      }
   },
});

module.exports = upload;
