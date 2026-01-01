;
import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  email: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
});

const loginModel = mongoose.model("login", loginSchema);

export default loginModel;
