import { MongoosePopulateRepository } from "@/core/infrastructure/mongoose/implementations/populate.repository";
import { MongooseReadRepository } from "@/core/infrastructure/mongoose/implementations/read.repository";
import { MongooseBase } from "@/core/infrastructure/mongoose/types";

export type PreTechRepository<TBase> = MongooseReadRepository<TBase> & MongoosePopulateRepository<TBase> & {
    readByName(name: string): Promise<TBase & MongooseBase>;
    updatePreTech(): Promise<void>;
}