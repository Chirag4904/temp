const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register user
module.exports.register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ savedUser, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credential" });
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
