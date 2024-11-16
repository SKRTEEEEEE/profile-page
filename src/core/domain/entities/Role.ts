import { MongooseBase, TimestampBase } from "@/core/application/repositories/mongoose";
import mongoose from "mongoose";

export enum RoleType {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT',
    STUDENT_PRO = "STUDENT_P",
    //Ahora en beta
    PROF_TEST = "PROF_TEST",
    PROF = "PROF",
    PROF_PRO = "PROF_PRO"
    // Añade aquí más tipos de roles según sea necesario
  }

  export interface RoleDocument extends RoleBase, TimestampBase, mongoose.Document {
    _id: mongoose.Types.ObjectId
  }
  export type Role = MongooseBase & RoleBase
export type RoleBase = {
  address: string,
  permissions: RoleType,
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: string;
}