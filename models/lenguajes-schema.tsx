
import { ILenguaje } from "@/types";
import mongoose from "mongoose";



const LenguajesSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },
        afinidad: {
            type: String,
            required: true,
            enum: ['maxima', 'alta', 'moderada', 'baja', 'minima'],
        },
        web:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
export const LenguajesModel =
  mongoose.models.Lenguajes || mongoose.model<ILenguaje>('Lenguajes', LenguajesSchema);

// module.exports = ArticleModel;