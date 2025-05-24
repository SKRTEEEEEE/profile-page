import { LengBase, TechBase, TechForm } from "@/core/domain/entities/tech";
import { ApiTechRepository } from "@/core/infrastructure/api/tech.repository";
import { MongooseLenguajesRepository } from "@/core/infrastructure/mongoose/entities/tech.repository";
import { MongooseDeleteProps, MongooseReadProps, MongooseUpdateProps } from "@/core/infrastructure/mongoose/types/implementations";
import { ActualizarGithubTechsType } from "@/core/presentation/controllers/tech/github.controller";
import { Leng } from "@/dynamic.types";

const monLengRepository = new MongooseLenguajesRepository()
const apiLengRepository = new ApiTechRepository()

export const apiReadAllTechsUC=async()=>{
    return await apiLengRepository.readAll()
}
export const apiActualizarGithubTechsCApi=async (props:{type:ActualizarGithubTechsType})=>{
    return await apiLengRepository.actualizarGithub(props)
}
export const apiDeleteTechUC = async (name:string) => {
    return await apiLengRepository.delete({nameId:name})
    
}
export const apiCreateTechUC = async (data: TechBase) => {
    return await apiLengRepository.create(data as LengBase) 
}
export const apiUpdateTechUC = async (data: TechForm) => {
    return await apiLengRepository.update(data)
}
  export const mongooseCreateTechUC =  async (data: TechBase) =>{
    return await monLengRepository.create(data as LengBase)
  }
// export const readLengUC = async (
// props: MongooseReadProps<Leng>
// ) => {
//     return await monLengRepository.read(props)
// }
export const mongooseReadAllTechsUC = async (

) => {
    return await monLengRepository.read({})
}

export const mongooseReadOneTechUC =  async (
    props: MongooseReadProps<Leng>
) => {
    return await monLengRepository.readOne(props)
}
export const mongooseDeleteTechUC = async (
    props:MongooseDeleteProps<Leng>
  )=>{
    return await monLengRepository.delete(props.filter)
  }

  export const mongooseUpdateTechUC = async (
    props: MongooseUpdateProps<Leng>
  ) => {
    return await monLengRepository.update(props)
  }

