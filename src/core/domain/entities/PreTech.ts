import { MongooseBase, MongooseDocument, TimestampBase } from "@/core/infrastructure/mongoose/types";

export type PreTechBase = {
    nameId: string;
    nameBadge: string;
    color: string;
    web: string;
}
export interface PreTechDocument extends PreTechBase, TimestampBase, MongooseDocument{};
export type PreTech = PreTechBase & MongooseBase;

