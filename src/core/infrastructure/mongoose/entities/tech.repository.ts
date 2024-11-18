import { Leng, LengDocument, TechBase } from "@/core/domain/entities/Tech";
import {  LenguajesModel } from "@/models/tech-schema";
import { LengRepository } from "@/core/application/interfaces/entities/tech";
import { MongooseLengPattern } from "../patterns/leng.pattern";
import { FilterQuery } from "mongoose";

  
  export class MongooseLenguajesRepository extends MongooseLengPattern<Leng> implements LengRepository<TechBase> {
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