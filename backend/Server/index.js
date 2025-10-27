const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/healthapp");
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Mongoose model
const UserData = mongoose.model("UserData", new mongoose.Schema({
 name: String,
  email: String,
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  sleep: Number,
  exerciseFrequency: String,
  exerciseType: String,
  waterIntake: Number,
  allergies: String,
  alcohol: String,
  smoking: Boolean,
  stress: Number,
  mealType: String,
  dailyMeals: Number,
  snacksFrequency: String,
  sugarIntake: String,
  location: String
}));

app.use(express.json());

// POST route to receive form data
app.post("/api/submit", async (req, res) => {
  try {
    const user = new UserData(req.body);
    await user.save();
    res.status(200).json({ message: "Data saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving data." });
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const users = await UserData.find().sort({ _id: -1 }); // newest first
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user data." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
