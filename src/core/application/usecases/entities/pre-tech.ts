import { PreTechBase } from "@/core/domain/entities/pre-tech";
import { MongoosePreTechRepository } from "@/core/infrastructure/mongoose/entities/pre-tech.repository";
import { MongooseReadProps } from "@/core/infrastructure/mongoose/types/implementations";

const preTechRepository = new MongoosePreTechRepository<PreTechBase>()

export const readPreTechUC = async (props: MongooseReadProps<PreTechBase>) => {
  return await preTechRepository.read(props)
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