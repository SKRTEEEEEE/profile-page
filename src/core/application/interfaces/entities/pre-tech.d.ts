import { MongooseReadRepository } from "@/core/infrastructure/mongoose/implementations/read.repository";

export type PreTechRepository<TBase> = MongooseReadRepository<TBase> & {
    readByName(name: string): Promise<TBase & MongooseBase>;
    updatePreTech(): Promise<void>;
}