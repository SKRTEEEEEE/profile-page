
import { RoleBase, RoleDocument } from "@/core/domain/entities/Role";
import { UserDocument } from "@/core/domain/entities/User";

import mongoose, { Schema } from "mongoose";
export const roleEnum = ['ADMIN', 'STUDENT', 'STUDENT_P', 'PROF_TEST', 'PROF', "PROF_PRO"]




const userSchema = new Schema<UserDocument>({
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
      paymentId: { type: String }, 
}, {
    timestamps: true 
})
const roleSchema = new Schema<RoleDocument>({
    address: { type: String, required: true },
    permissions: { type: String, required: true, enum: roleEnum, },
    stripeCustomerId: { type: String },
  subscriptionId: { type: String },
  subscriptionStatus: { type: String },
}, {
    timestamps: true 
})
export const UserModel = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
export const RoleModel = mongoose.models.Role || mongoose.model<RoleDocument>("Role", roleSchema)