import { MongooseBase, MongooseDocument, TimestampBase } from "@/core/infrastructure/mongoose/types/index"
import mongoose from "mongoose"
import { z } from "zod"

export const techSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    category: z.enum(["lenguaje", "framework", "libreria"], {
      required_error: "Debes seleccionar una categoría",
    }),
    badge: z.string().min(2, "El badge debe tener al menos 2 caracteres"),
    color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color inválido"),
    preferencia: z.number().int().min(1, "Debe ser al menos 1").max(100, "No puede ser mayor a 100"),
    experiencia: z.number().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
    afinidad: z.number().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
    lenguajeTo: z.string().optional(),
    frameworkTo: z.string().optional(),
    img: z.string().regex(/https:\/\/utfs\.io\/f\/([a-f0-9\-]+)-([a-z0-9]+)\.(jpg|webp|png)/, "URL invalida").nullable().default(null)
  })
export type UpdateTechForm = LengDocument | FwDocument | LibDocument;  

export type TechForm = z.infer<typeof techSchema>
export type Tech = MongooseBase & TechBase
export interface TechDocument extends TechBase, TimestampBase, MongooseDocument{
    _id: mongoose.Types.ObjectId
}
export type Lib = Tech
export type Fw = Tech&{
    librerias?: Lib[]
}
export type Leng = Tech&{
    frameworks?: Fw[]
}
export interface LibDocument extends TechDocument {}
export interface FwDocument extends TechDocument{
    librerias?: LibDocument[]
}
export interface LengDocument extends TechDocument{
    frameworks: FwDocument[]
}
export type TechBase = Omit<TechForm, "lenguajeTo" | "frameworkTo" | "category">
  