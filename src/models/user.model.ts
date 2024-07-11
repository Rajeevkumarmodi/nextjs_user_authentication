import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

// const User = mongoose.model("users", userSchema);
// console.log("models", mongoose.models);

const User = mongoose.models.users
  ? mongoose.models.users
  : mongoose.model("users", userSchema);

export default User;
