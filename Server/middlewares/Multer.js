const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");
require("dotenv").config();

const filepath = path.join(__dirname, "../public/uploads");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "photovault", // Choose the folder in your Cloudinary account where you want to store the uploaded files
  },
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, filepath);
//   },
//   filename: function (req, file, cb) {
//     const userId = req.user.username;
//     const originalFilename = file.originalname;
//     const fileExtension = path.extname(originalFilename);
//     const randomString = Math.random().toString(36).substring(7);
//     const filename =
//       userId +
//       "-" +
//       originalFilename.replace(/\s+/g, "-") +
//       "-" +
//       randomString +
//       fileExtension;
//     cb(null, filename);
//   },
// });

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadMiddleware = multer({ storage: storage, fileFilter });

module.exports = uploadMiddleware;
