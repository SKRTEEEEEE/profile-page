import { LengRepository } from "@/core/application/interfaces/entities/tech";
import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";
import { MongooseCRRUUD2Pattern } from "../patterns/crruud2.pattern";
import { Leng, TechBase } from "@/core/domain/entities/tech";
import { LengsModel } from "../schemas/tech.schema";

  
  export class MongooseLenguajesRepository extends MongooseCRRUUD2Pattern<Omit<Leng, "id" | "createdAt" | "updatedAt">> implements LengRepository<TechBase> {
    constructor() {
      super(LengsModel);
    }
    async readOne(
      filter?: FilterQuery<Leng> | undefined, 
      projection?: ProjectionType<Leng> | null | undefined, 
      options?: QueryOptions<Leng> | null | undefined){
      this.connect()
      return this.Model.findOne(filter, projection, options)
    }
  }