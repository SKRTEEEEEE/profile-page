import { MongooseBase, MongooseTimestamps } from "@/core/infrastructure/mongoose/types";
import { Document } from "mongoose";
import { z } from "zod";

export const firstStepTechSchema = z.object({
    nameId: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    // from pre-tech
    nameBadge: z.string(),
    color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color inválido"),
    web: z.string().url(),
})
export const secondStepTechSchema = z.object({
    experiencia: z.number().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
    afinidad: z.number().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
    img: z.string().regex(/https:\/\/(?:utfs\.io|[a-z0-9]+\.ufs\.sh)\/f\/([a-f0-9\-]+)-([a-z0-9]+)\.(jpg|webp|png)/, "URL invalida").nullable().default(null),
    lengTo: z.string().optional(),
    fwTo: z.string().optional(),
    category: z.enum(["leng", "fw", "lib"], {
        required_error: "Debes seleccionar una categoría",
      }),
})
export const techSchema = z.object({
    // nameId: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    // // from pre-tech
    // nameBadge: z.string(),
    // color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color inválido"),
    // web: z.string().url(),
    // user introduced data
    // experiencia: z.number().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
    // afinidad: z.number().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
    // img: z.string().regex(/https:\/\/(?:utfs\.io|[a-z0-9]+\.ufs\.sh)\/f\/([a-f0-9\-]+)-([a-z0-9]+)\.(jpg|webp|png)/, "URL invalida").nullable().default(null),
    desc: z.object({
        es: z.string().min(2, "La descripción debe tener al menos 2 caracteres"),
        en: z.string().min(2, "La descripción debe tener al menos 2 caracteres"),
        ca: z.string().min(2, "La descripción debe tener al menos 2 caracteres"),
        de: z.string().min(2, "La descripción debe tener al menos 2 caracteres"),
    }),
    // auto calculated data  //-> Lo traspasamos como tipo
    // preferencia: z.number().int().min(1, "Debe ser al menos 1"),
    // usoGithub: z.number().int().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
    // user introduced and calculated data
    // lengTo: z.string().optional(),
    // fwTo: z.string().optional(),
    // category: z.enum(["leng", "fw", "lib"], {
    //     required_error: "Debes seleccionar una categoría",
    //   }),
}).merge(firstStepTechSchema).merge(secondStepTechSchema)

export type TechForm = z.infer<typeof techSchema>;
export type TechBase = (Omit<TechForm, "lengTo" | "fwTo" | "category">) & {
    preferencia: number
    usoGithub: number
}; 
export type Tech = TechBase & MongooseBase ;
type TechDocument = TechBase & MongooseTimestamps & Document;



//tipos heredados(lenguaje, framework, librería)
// document types (for mongoose/backend)
export type LibDocument = TechDocument;
export type FwDocument = TechDocument & {
    librerias?: LibDocument[];
}
export type LengDocument = TechDocument & {
    frameworks?: FwDocument[];
}

// ui types (for frontend/backend)
export type Lib = Tech;
export type Fw = Tech &{
    librerias?: Lib[]
}
export type Leng = Tech & {
    frameworks?: Fw[]
}

//flatten techs(for frontend)
export type FullTechData = TechBase & {
    valueAfin: string;
    valueExp: string;
    isFw?: string;
    isLib?: string;
    valueUso: string;
}