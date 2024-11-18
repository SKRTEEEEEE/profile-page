import { Leng, LengDocument, TechBase } from "@/core/domain/entities/Tech";
import {  LenguajesModel } from "@/models/tech-schema";
import { LengRepository } from "@/core/application/interfaces/entities/tech";
import { FilterQuery } from "mongoose";
import { MongooseCRRUUD2Pattern } from "../patterns/crruud2.pattern";

  
  export class MongooseLenguajesRepository extends MongooseCRRUUD2Pattern<Leng> implements LengRepository<TechBase> {
    constructor() {
      super(LenguajesModel);
    }
    async readOne(
      filter?: FilterQuery<Leng> | undefined, 
      projection?: any | null | undefined, 
      options?: any | null | undefined){
      this.connect()
      return this.Model.findOne(filter, projection, options)
    }
  }