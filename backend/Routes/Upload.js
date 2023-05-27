const { Router } = require("express");
const uploadMiddleware = require("../middlewares/Multer");
const verifyToken = require("../middlewares/Userauth");
const UploadController = require("../controllers/UploadController");

const router = Router();

router.post(
  "/save",
  verifyToken,
  uploadMiddleware.single("img"),
  UploadController.upload
);

module.exports = router;
