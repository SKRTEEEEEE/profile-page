import { Leng, LengDocument, TechBase } from "@/core/domain/entities/Tech";
import {  LenguajesModel } from "@/models/tech-schema";
import { LengRepository } from "@/core/application/interfaces/entities/tech";
import { MongooseLengPattern } from "../patterns/leng.pattern";

// export class MongooseLibreriaRepository extends MongooseBaseRepository<TechBase, Lib, LibDocument> implements LibRepository {
//     constructor() {
//       super(LibreriasModel);
//     }
//   }
  
//   export class MongooseFrameworkRepository extends MongooseBaseRepository<TechBase, Fw, FwDocument> implements FwRepository {
//     constructor() {
//       super(FrameworksModel);
//     }
//   }
  
  export class MongooseLenguajesRepository extends MongooseLengPattern<Leng> implements LengRepository<TechBase> {
    constructor() {
      super(LenguajesModel);
    }
    public makeModel(data: Partial<Leng>){
      return new this.Model(data)
    }
  }