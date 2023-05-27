const Image = require("../models/Image");

// READ
module.exports.getUserImages = async (req, res) => {
  try {
    const { username } = req.params;
    const searchValue = req.body.searchvalue;
    const userImages = await Image.find({
      name: { $regex: searchValue, $options: "i" },
      username: username,
    }).exec();
    res.status(200).json(userImages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
