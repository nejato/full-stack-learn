import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const userSchema = new mongoose.Schema({

}, modelOptions);
const userModel = mongoose.model("user", userSchema)
export default userModel;