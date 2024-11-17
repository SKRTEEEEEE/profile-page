import { Leng, Tech } from "@/core/domain/entities/Tech";
import { MongooseLenguajesRepository, MongooseLibreriaRepository } from "@/core/infrastructure/entities/mongoose-tech";
import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";

const libRepository = new MongooseLibreriaRepository()
const lengRepository = new MongooseLenguajesRepository()

export const readAllTechsUC=async()=>{
    return await lengRepository.read()
}
export const getLengModelUC = () => {
    return lengRepository.getLengModel()
}
export const readLengUC = (
    filter?: FilterQuery<Leng>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
) => {
    return lengRepository.read(filter, projection, options)
}