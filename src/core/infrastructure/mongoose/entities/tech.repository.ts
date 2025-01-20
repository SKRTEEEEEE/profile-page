import { LengRepository } from "@/core/application/interfaces/entities/tech";
import { MongooseCRRUUD2Pattern } from "../patterns/crruud2.pattern";
import { Leng, TechBase } from "@/core/domain/entities/tech";
import { LengsModel } from "../schemas/tech.schema";
import { MongooseReadProps } from "../types/implementations";

  
  export class MongooseLenguajesRepository extends MongooseCRRUUD2Pattern<Omit<Leng, "id" | "createdAt" | "updatedAt">> implements LengRepository<TechBase> {
    constructor() {
      super(LengsModel);
    }
    async readOne(
      {filter, projection, options}: MongooseReadProps<Omit<Leng, "id" | "createdAt" | "updatedAt">>){
      this.connect()
      return this.Model.findOne(filter, projection, options)
    }
  }