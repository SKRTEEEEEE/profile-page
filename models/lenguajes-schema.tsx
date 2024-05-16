
import { IFramework, ILenguaje, ILibreria } from "@/types";
import mongoose from "mongoose";
// Define el esquema para una librería
const LibreriaSchema = new mongoose.Schema<ILibreria>({
    name: {
        type: String,
        required: true,
    },
    afinidad: {
        type: Number,
        required: true,
    },
    badge:{
        type: String,
        required: true,
    },
    preferencia:{
        type: Number,
        required: true,
    },
    color:{
        type: String,
        required: true,
    },
    experiencia:{
        type: Number,
        required: true,
    }
},
{
    timestamps: true,
});

// Define el esquema para un framework, que incluye una lista de librerías
const FrameworkSchema = new mongoose.Schema<IFramework>({
    name: {
        type: String,
        required: true,
    },
    afinidad: {
        type: Number,
        required: true,
    },
    badge:{
        type: String,
        required: true,
    },
    preferencia:{
        type: Number,
        required: true,
    },
    color:{
        type: String,
        required: true,
    },
    experiencia:{
        type: Number,
        required: true,
    },
    librerias: [LibreriaSchema]
},
{
    timestamps: true,
}
);




const LenguajesSchema = new mongoose.Schema<ILenguaje>(
    {

        name: {
            type: String,
            required: true,
        },
        afinidad: {
            type: Number,
            required: true,
        },
        badge:{
            type: String,
            required: true,
        },
        preferencia:{
            type: Number,
            required: true,
        },
        color:{
            type: String,
            required: true,
        },
        experiencia:{
            type: Number,
            required: true,
        },
        frameworks: [FrameworkSchema]
    },
    {
        timestamps: true,
    }
);
export const LenguajesModel =
  mongoose.models.Lenguajes || mongoose.model<ILenguaje>('Lenguajes', LenguajesSchema);

// module.exports = ArticleModel;