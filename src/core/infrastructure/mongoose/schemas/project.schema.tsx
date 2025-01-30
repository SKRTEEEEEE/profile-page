import { ProjectDocument } from "@/core/domain/entities/project";
import mongoose, { Schema } from "mongoose";

const techsProjectSchema = new Schema({
    nameId: { type: String, required: true },
    nameBadge: { type: String, required: true },
    img: { type: String, default: null },
    web: { type: String, required: true },

    desc: {type: Map, of: String, required: true},
    type: {type: [String], required: true},
    typeDesc: {type: Map, of: String, required: true},
    version: {type: String, default: null},
})
const timeProjectSchema = new Schema({
    title: { type: Map, of: String, required: true },
    date: { type: String, required: true },
    desc: { type: Map, of: String, required: true },
    type: {type: [String], required: true},
    techs: [{type:String , ref: "projects"}],
})
const keyProjectSchema = new Schema({
    icon: {
        iconName: { type: String, required: true },
        className: { type: String, required: true },
    },
    title: { type: Map, of: String, required: true },
    desc: { type: Map, of: String, required: true },
})
const projectSchema = new Schema<ProjectDocument>({
    nameId: { type: String, required: true, unique: true},
    openSource: String,
    operative: String,
    ejemplo: {type:Boolean, required: true, default: false},
    image: String,
    icon: {type: String, required: true},
    
    title: { type: Map, of: String, required: true },
    desc: { type: Map, of: String, required: true },
    lilDesc: { type: Map, of: String, required: true },

    time: [timeProjectSchema],
    keys: [keyProjectSchema],
    techs: [techsProjectSchema],
},{timestamps: true})
// Añadimos indice en techs.nameId para facilitar la búsqueda
projectSchema.index({ 'techs.nameId': 1 });
export const ProjectModel = mongoose.models.projects || mongoose.model("projects", projectSchema)