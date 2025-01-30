import { ProjectDocument } from "@/core/domain/entities/project";
import mongoose, { Schema } from "mongoose";

const techsProjectSchema = new Schema({
    nameId: { type: String, required: true },
    nameBadge: { type: String, required: true },
    img: { type: String, default: null },
    web: { type: String, required: true },

    desc: {type: Map, of: String, required: true},
    type: {type: String, required: true},
    typeDesc: {type: Map, of: String, required: true},
})
const timeProjectSchema = new Schema({
    title: { type: Map, of: String, required: true },
    date: { type: String, required: true },
    desc: { type: Map, of: String, required: true },
    subtitle: { type: String, required: true },
    type: {type: String, required: true},
    techs: [{id: Schema.Types.ObjectId, ref: "Project.techs"}],
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
})
export const ProjectModel = mongoose.models.projects || mongoose.model("projects", projectSchema)