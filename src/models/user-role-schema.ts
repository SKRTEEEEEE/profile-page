
import { RoleBase } from "@/core/domain/entities/Role";
import { UserBase } from "@/core/domain/entities/User";
import mongoose, { Schema } from "mongoose";

export interface UserDocument extends Document, UserBase { 
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export interface RoleDocument extends Document, RoleBase {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
 }

const userSchema = new Schema({
    address: { type: String, required: true },
    roleId: {default: null, type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    isAdmin: { default: false, type: Boolean, required: true },
    solicitudAdmin: { default: false, type: Boolean, required: true },
    img: {default: null, type: String, required: true},
    nick: { type: String },
}, {
    timestamps: true 
})
const roleSchema = new Schema({
    address: { type: String, required: true },
    permissions: { type: String, required: true, enum: ['ADMIN', 'STUDENT', 'STUDENT_PRO'], }
}, {
    timestamps: true 
})
export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const RoleModel = mongoose.models.Role || mongoose.model("Role", roleSchema)