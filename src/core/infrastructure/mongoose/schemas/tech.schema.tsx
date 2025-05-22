import { LengBase } from "@/core/domain/entities/tech";
import mongoose, { Document, Schema } from "mongoose";


const TechBaseSchema = {
    nameId: {
        type: String,
        required: true,
        minlength: 2
    },
    nameBadge: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        match: /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    },
    web: {
        type: String,
        required: true
    },
    preferencia: {
        type: Number,
        required: true,
        min: 1
    },
    experiencia: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    afinidad: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    img: {
        type: String,
        default: null,
        match: /https:\/\/(?:utfs\.io|[a-z0-9]+\.ufs\.sh)\/f\/([a-f0-9\-]+)-([a-z0-9]+)\.(jpg|webp|png)/
    },
    desc: {
        es: { type: String, required: true, minlength: 2 },
        en: { type: String, required: true, minlength: 2 },
        ca: { type: String, required: true, minlength: 2 },
        de: { type: String, required: true, minlength: 2 }
    },
    usoGithub: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
};


const LibSchema: Schema = new Schema({
    ...TechBaseSchema
}, { timestamps: true });

const FwSchema: Schema = new Schema({
    ...TechBaseSchema,
    librerias: [LibSchema]
}, {timestamps: true})

const LengSchema: Schema = new Schema<LengBase & Document>({
    ...TechBaseSchema,
    frameworks: [FwSchema]
}, {timestamps: true})

export const LengsModel = mongoose.models.Lenguajes || mongoose.model("Lenguajes", LengSchema)