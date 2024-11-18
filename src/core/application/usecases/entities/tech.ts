import { Fw, FwDocument, Leng, LengDocument, LibDocument, TechBase } from "@/core/domain/entities/Tech";
import { MongooseLenguajesRepository } from "@/core/infrastructure/mongoose/entities/tech.repository";
import { MongooseBase } from "@/core/infrastructure/mongoose/types";

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

export const readOneTechUC =  async (
    filter?: any | undefined, 
    projection?: any | null | undefined, 
    options?: any | null | undefined
) => {
    return await lengRepository.readOne(filter, projection, options)
}
export const deleteTechUC = async (
    filter?: Partial<MongooseBase & TechBase & { frameworks?: Fw[] | undefined; }> | null | undefined, 
    options?: any | null | undefined
  )=>{
    return await lengRepository.delete(filter, options)
  }
