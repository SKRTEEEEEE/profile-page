import { Tech } from "@/core/domain/entities/Tech";
import { MongooseLenguajesRepository, MongooseLibreriaRepository } from "@/core/infrastructure/entities/mongoose-tech";

const libRepository = new MongooseLibreriaRepository()
const lengRepository = new MongooseLenguajesRepository()

export const readAllTechsUC=async()=>{
    return await lengRepository.read()
}