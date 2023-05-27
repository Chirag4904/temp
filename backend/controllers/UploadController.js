const Image = require("../models/Image");

module.exports.upload = async (req, res) => {
  try {
    const userId = req.body.username; // user ID available in the request object
    const { name } = req.body;
    const filepath = req.file.path;

    // Create a new instance of the Image model
    const image = new Image({
      name: name,
      filepath: filepath,
      username: userId,
    });

    // Save the image to the database
    await image.save();

    res.json({ message: "Image uploaded successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
};
