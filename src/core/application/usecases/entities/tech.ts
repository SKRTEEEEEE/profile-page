import { Leng } from "@/core/domain/entities/Tech";
import { MongooseLenguajesRepository } from "@/core/infrastructure/mongoose/entities/tech.repository";
import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";

const lengRepository = new MongooseLenguajesRepository()

export const readAllTechsUC=async()=>{
    return await lengRepository.read()
}
export const getLengModelUC = (data:Partial<Leng>) => {
    return lengRepository.makeModel(data)
}
export const readLengUC = (
    filter?: FilterQuery<Leng>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
) => {
    return lengRepository.read(filter, projection, options)
}