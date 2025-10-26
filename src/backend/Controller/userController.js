import User from "../models/userinfo.js";

// POST /api/submit
// POST /api/submit

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: "Data saved successfully!",
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving data." });
  }
};

// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user data." });
  }
};
