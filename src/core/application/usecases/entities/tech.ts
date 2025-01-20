import { Fw, Leng, TechBase } from "@/core/domain/entities/tech";
import { MongooseLenguajesRepository } from "@/core/infrastructure/mongoose/entities/tech.repository";
import { MongooseReadProps } from "@/core/infrastructure/mongoose/implementations/read.repository";
import { MongooseBase } from "@/core/infrastructure/mongoose/types";

const lengRepository = new MongooseLenguajesRepository()

export const readAllTechsUC=async()=>{
    return await lengRepository.read({})
}

export const readLengUC = async (
props: MongooseReadProps<Leng>
) => {
    return await lengRepository.read(props)
}

export const readOneTechUC =  async (
    props: MongooseReadProps<TechBase>
) => {
    return await lengRepository.readOne(props)
}
export const deleteTechUC = async (
    filter?: Partial<MongooseBase & TechBase & { frameworks?: Fw[] | undefined; }> | null | undefined, 
    options?: any | null | undefined
  )=>{
    return await lengRepository.delete(filter, options)
  }

  export const updateTechUC = async (
    filter?: any | undefined,
    update?: any | undefined,
    options?: any | null | undefined
  ) => {
    return await lengRepository.update(filter, update, options)
  }

  export const createTechUC =  async (data: TechBase) =>{
    return await lengRepository.create(data)
  }