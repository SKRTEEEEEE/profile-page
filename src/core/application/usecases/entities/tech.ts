import { Leng } from "@/core/domain/entities/Tech";
import { MongooseLenguajesRepository } from "@/core/infrastructure/mongoose/entities/tech.repository";
import { FilterQuery, Model, ProjectionType, QueryOptions } from "mongoose";

const lengRepository = new MongooseLenguajesRepository()

export const readAllTechsUC=async()=>{
    return await lengRepository.read()
}
// export const getLengModelUC = (data:Partial<Leng>): Model<any> => {
//     return lengRepository.makeModel(data)
// }
export const readLengUC = async (
    filter: FilterQuery<Leng>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
) => {
    return await lengRepository.read(filter, projection, options)
}