import mongoose, { Document, Schema } from "mongoose";

const preTechSchema = new Schema<PreTechBase & Document>({
    nameId: { type: String, required: true, unique: true },
    nameBadge: { type: String, required: true},
    color: { type: String, required: true },
    web: { type: String, required: true },
}, {
    timestamps: true
})
export const PreTechModel = mongoose.models.ptechs || mongoose.model<PreTechBase & Document>('ptechs', preTechSchema);