import { MongoosePreTechRepository } from "@/core/infrastructure/mongoose/entities/pre-tech.repository";

const preTechRepository = new MongoosePreTechRepository()

export const readPreTechUC = async () => {
  return await preTechRepository.read()
}
export const readByNamePreTechUC = async (name:string) => {
  return await preTechRepository.readByName(name)
}
export const updatePreTechUC = async () => {
    return await preTechRepository.updatePreTech()
}