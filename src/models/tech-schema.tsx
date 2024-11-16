
import { FwDocument, LengDocument, LibDocument, TechForm } from "@/core/domain/entities/Tech";
import mongoose, { Schema } from "mongoose";

export interface ILenguaje extends Document, TechForm {
  frameworks?: IFramework[];
}
export interface IFramework extends TechForm {
  librerias?: ILibreria[];
}
export interface ILibreria extends TechForm{}

const LibreriaSchema: Schema = new Schema<LibDocument>({
    name: { type: String, required: true },
    afinidad: { type: Number, required: true },
    badge: { type: String, required: true },
    preferencia: { type: Number, required: true },
    color: { type: String, required: true },
    experiencia: { type: Number, required: true },
    img: {type: String}
  }, { timestamps: true });

  export const LibreriasModel = mongoose.models.Librerias || mongoose.model<LibDocument>("Librerias", LibreriaSchema)
  
  const FrameworkSchema: Schema = new Schema<FwDocument>({
    name: { type: String, required: true },
    afinidad: { type: Number, required: true },
    badge: { type: String, required: true },
    preferencia: { type: Number, required: true },
    color: { type: String, required: true },
    experiencia: { type: Number, required: true },
    img: {type: String},
    librerias: [LibreriaSchema],
  }, { timestamps: true });
  
  export const FrameworksModel = mongoose.models.Frameworks || mongoose.model<FwDocument>("Frameworks", FrameworkSchema)

  const LenguajesSchema: Schema = new Schema<LengDocument>({
    name: { type: String, required: true },
    afinidad: { type: Number, required: true },
    badge: { type: String, required: true },
    preferencia: { type: Number, required: true },
    color: { type: String, required: true },
    experiencia: { type: Number, required: true },
    img: {type: String},
    frameworks: [FrameworkSchema],
  }, { timestamps: true });
  
  export const LenguajesModel = mongoose.models.Lenguajes || mongoose.model<LengDocument>('Lenguajes', LenguajesSchema);