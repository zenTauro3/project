import mongoose from "mongoose";

const user = new mongoose.Schema({
    type: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String }
});

export default mongoose.model("users", user);