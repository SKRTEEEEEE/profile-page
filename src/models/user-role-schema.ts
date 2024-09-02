
import { RoleBase } from "@/core/domain/entities/Role";
import { UserBase } from "@/core/domain/entities/User";
import mongoose, { Schema } from "mongoose";
export const roleEnum = ['ADMIN', 'STUDENT', 'STUDENT_PRO', 'PROF_TEST', 'PROF', "PROF_PRO"]

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
    role: { default: null, type: String, enum: roleEnum },
    solicitud: { default: null, type: String, enum: roleEnum },
    img: {default: null, type: String},
    email: {default: null, type: String},
    nick: { type: String },
    isVerified: {
        type: Boolean,
        default: false,
      },
      verifyToken: {
        type: String,
      },
      verifyTokenExpire: {
        type: Date,
      },
}, {
    timestamps: true 
})
const roleSchema = new Schema({
    address: { type: String, required: true },
    permissions: { type: String, required: true, enum: roleEnum, }
}, {
    timestamps: true 
})
export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const RoleModel = mongoose.models.Role || mongoose.model("Role", roleSchema)