import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required :true,
  },
  email:  {
    type: String,
    required :true,
    unique:true
  },
  age:  {
    type: String,
    required :true
  },
  gender:  {
    type: String,
    required :true
  },
  height:  {
    type: String,
  },
  weight:  {
    type: String,
  },
  sleep:  {
    type: String,
  },
  exerciseFrequency:  {
    type: String,
  },
  exerciseType:  {
    type: String,
  },
  allergies: {
    type: String,
  },
  alcohol:  {
    type: String,
  },
  smoking:  {
    type: String,
  },
  stress:  {
    type: String,
  },
  mealType:  {
    type: String,
  },
  sugarIntake:  {
    type: String,
  },
  location:  {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
