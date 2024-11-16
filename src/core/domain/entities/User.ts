import { z } from "zod"
import { RoleType } from "./Role"
import mongoose from "mongoose"
import { MongooseBase, MongooseDocument, TimestampBase } from "@/core/infrastructure/types/mongoose"

export const userSchema = z.object({
    nick: z.string().min(5, { message: "⚠️ Debe tener 5 caracteres como mínimo." }).max(25, { message: "⚠️ Debe tener 25 caracteres como máximo." }).optional(),
    img: z.string().nullable().default(null),
    email: z.string().email({ message: "El email debe ser válido" }).nullable().optional(), // Cambia a string y establece un valor por defecto
  })
export type UserForm = z.infer<typeof userSchema>
export type User = MongooseBase & UserBase
export interface UserDocument extends UserBase, TimestampBase, MongooseDocument {
  _id: mongoose.Types.ObjectId
}
export type UserBase = UserForm & {
    address: string,
    roleId: string | null,
    role: RoleType | null,
    solicitud: RoleType | null,
    isVerified: boolean,
    verifyToken?: string,
    verifyTokenExpire?: string,
    nick?: string,
    paymentId?: string,
}