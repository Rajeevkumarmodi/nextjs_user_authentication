import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String,
  },
  { timestamps: true }
);

// const User = mongoose.model("users", userSchema);
// console.log("models", mongoose.models);

const User = mongoose.models.users
  ? mongoose.models.users
  : mongoose.model("users", userSchema);

export default User;
