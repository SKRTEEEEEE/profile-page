"use server"
import { Project } from "@/core/domain/entities/project";
import { MongooseProjectRepository } from "@/core/infrastructure/mongoose/entities/projects.repository";

const projectRepository = new MongooseProjectRepository<Project>()

export const testPopulateUC = async () => {
    return await projectRepository.testPopulate()
}