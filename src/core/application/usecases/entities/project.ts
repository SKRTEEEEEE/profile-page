"use server"
import { Project } from "@/core/domain/entities/project";
import { MongooseProjectRepository } from "@/core/infrastructure/mongoose/entities/projects.repository";
import { ProjectModel } from "@/core/infrastructure/mongoose/schemas/project.schema";
const extractId = (item: any, index: number) => {
    const { _id, ...rest } = item;
    return { ...rest, id:  index.toString()};}
const parseOpt = {
    time: (value:any) => value?.map((item: any, index:number) => extractId(item, index)),
    keys: (value: any) => value?.map((item:any, index:number) => extractId(item, index)),
    techs: (value:any) => value?.map((item: any, index:number) => extractId(item, index))
  }

const projectRepository = new MongooseProjectRepository<Project, {
    time: (value: any) => any;
    keys: (value: any) => any;
  }>(ProjectModel,parseOpt)
export const testPopulateUC = async () => {
    return await projectRepository.testPopulate()
}

export const readExampleProjectsUC = async () => {
    return await projectRepository.read({filter: {ejemplo: true}})
}
export const readProjectsDeployedUC = async () => {
  return await projectRepository.read({filter: {operative: {$ne: null}}})
}
export const readProjectByIdUnoptUC = async (id: string) => {
  const projects = await projectRepository.read({filter: {_id: id}})
  return projects[0]
}
// export const readExampleProjectsUC = async () => {
//     return await projectRepository.readLean()
// }