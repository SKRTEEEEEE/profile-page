
import { ILenguaje} from "@/types";
import mongoose, { Schema } from "mongoose";


const LibreriaSchema: Schema = new Schema({
    name: { type: String, required: true },
    afinidad: { type: Number, required: true },
    badge: { type: String, required: true },
    preferencia: { type: Number, required: true },
    color: { type: String, required: true },
    experiencia: { type: Number, required: true },
  }, { timestamps: true });
  
  const FrameworkSchema: Schema = new Schema({
    name: { type: String, required: true },
    afinidad: { type: Number, required: true },
    badge: { type: String, required: true },
    preferencia: { type: Number, required: true },
    color: { type: String, required: true },
    experiencia: { type: Number, required: true },
    librerias: [LibreriaSchema],
  }, { timestamps: true });
  
  const LenguajesSchema: Schema = new Schema({
    name: { type: String, required: true },
    afinidad: { type: Number, required: true },
    badge: { type: String, required: true },
    preferencia: { type: Number, required: true },
    color: { type: String, required: true },
    experiencia: { type: Number, required: true },
    frameworks: [FrameworkSchema],
  }, { timestamps: true });
  
  export const LenguajesModel = mongoose.models.Lenguajes || mongoose.model<ILenguaje>('Lenguajes', LenguajesSchema);