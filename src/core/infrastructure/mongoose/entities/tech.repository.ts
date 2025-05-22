import { LengRepository } from "@/core/application/interfaces/entities/tech";
import { MongooseCRRUUD2Pattern } from "../patterns/crruud2.pattern";
import { LengBase, TechBase } from "@/core/domain/entities/tech";
import { LengsModel } from "../schemas/tech.schema";
import { MongooseReadProps } from "../types/implementations";

  
  export class MongooseLenguajesRepository extends MongooseCRRUUD2Pattern<LengBase> implements LengRepository<TechBase> {
    constructor() {
      super(LengsModel);
    }
    async readOne(
      {filter, projection, options}: MongooseReadProps<LengBase>){
      this.connect()
      return this.Model.findOne(filter, projection, options)
    }
  }