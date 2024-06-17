import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nick: String,
    address: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    solicitudAdmin:{
        type: Boolean,
        required: true,
    }

},{timestamps:true});
export const UserModel = mongoose.models.User || mongoose.model("User", userSchema)