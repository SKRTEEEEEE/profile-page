import { PreTechDocument } from "@/core/domain/entities/pre-tech";
import mongoose, { Schema } from "mongoose";

const preTechSchema = new Schema<PreTechDocument>({
    nameId: { type: String, required: true, unique: true },
    nameBadge: { type: String, required: true},
    color: { type: String, required: true },
    web: { type: String, required: true },
}, {
    timestamps: true
})
export const PreTechModel = mongoose.models.ptechs || mongoose.model<PreTechDocument>('ptechs', preTechSchema);