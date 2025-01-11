import { MongooseBase, MongooseDocument, MongooseTimestamps } from "@/core/infrastructure/mongoose/types";

export type PreTechBase = {
    nameId: string;
    nameBadge: string;
    color: string;
    web: string;
}
export interface PreTechDocument extends PreTechBase, MongooseTimestamps, MongooseDocument{};
export type PreTech = PreTechBase & MongooseBase;

