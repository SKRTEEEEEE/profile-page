
import mongoose, { Schema } from "mongoose";

export interface UserDocument extends Document { 
    _id: mongoose.Types.ObjectId;
    name: string;
    roleId: mongoose.Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface RoleDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    permissions: string;
    createdAt: Date;
    updatedAt: Date;
 }

const userSchema = new Schema({
    name: { type: String, required: true },
    roleId: { default: null, type: mongoose.Schema.Types.ObjectId, ref: "Role" },
}, {
    timestamps: true // Esto habilita los campos createdAt y updatedAt automáticamente
})
const roleSchema = new Schema({
    name: { type: String, required: true },
    permissions: { type: String, required: true, enum: ['ADMIN', 'STUDENT', 'STUDENT_PRO'], }
}, {
    timestamps: true // Esto habilita los campos createdAt y updatedAt automáticamente
}
)
export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const RoleModel = mongoose.models.Role || mongoose.model("Role", roleSchema)