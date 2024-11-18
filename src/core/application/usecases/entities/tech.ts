import { Leng } from "@/core/domain/entities/Tech";
import { MongooseLenguajesRepository } from "@/core/infrastructure/mongoose/entities/tech.repository";

const lengRepository = new MongooseLenguajesRepository()

export const readAllTechsUC=async()=>{
    return await lengRepository.read()
}
// export const getLengModelUC = (data:Partial<Leng>): Model<any> => {
//     return lengRepository.makeModel(data)
// }
export const readLengUC = async (
    filter: Partial<Leng>,
    projection?: any | null,
    options?: any | null
) => {
    return await lengRepository.read(filter, projection, options)
}