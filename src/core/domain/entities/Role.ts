import { DocumentBase, MongooseBase } from "./types";

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

  export interface RoleDocument extends Document, RoleBase, DocumentBase {}
export type Role = MongooseBase & RoleBase
export type RoleBase = {
  address: string,
  permissions: RoleType,
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: string;
}