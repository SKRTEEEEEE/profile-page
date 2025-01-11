import { MongoosePreTechRepository } from "@/core/infrastructure/mongoose/entities/pre-tech.repository";

const preTechRepository = new MongoosePreTechRepository()

export const readPreTechUC = async (filter?: any, projection?: any, options?:any) => {
  return await preTechRepository.read(filter, projection, options)
}
export const readByNamePreTechUC = async (name:string) => {
  return await preTechRepository.readByName(name)
}
export const updatePreTechUC = async () => {
    return await preTechRepository.updatePreTech()
}
export const readByQueryPreTechUC = async (query:string) => {
    return await preTechRepository.readByQuery(query)
}