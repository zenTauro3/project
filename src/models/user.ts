import mongoose from "mongoose";

const user = new mongoose.Schema({
    type: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    creation: { type: Date, default: Date.now() }
});

export default mongoose.model("users", user);