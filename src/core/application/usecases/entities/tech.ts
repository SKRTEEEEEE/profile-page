import {  Leng, TechBase } from "@/core/domain/entities/tech";
import { MongooseLenguajesRepository } from "@/core/infrastructure/mongoose/entities/tech.repository";
import { MongooseDeleteProps, MongooseReadProps, MongooseUpdateProps } from "@/core/infrastructure/mongoose/types/implementations";

const lengRepository = new MongooseLenguajesRepository()

export const createTechUC =  async (data: TechBase) =>{
  return await lengRepository.create(data)
}

export const readAllTechsUC=async()=>{
    return await lengRepository.read({})
}

export const readLengUC = async (
props: MongooseReadProps<Leng>
) => {
    return await lengRepository.read(props)
}

export const readOneTechUC =  async (
    props: MongooseReadProps<Leng>
) => {
    return await lengRepository.readOne(props)
}
export const deleteTechUC = async (
    props: MongooseDeleteProps<Leng>
  )=>{
    return await lengRepository.delete(props)
  }

  export const updateTechUC = async (
    props: MongooseUpdateProps<Leng>
  ) => {
    return await lengRepository.update(props)
  }

