import { Fw, FwDocument, Leng, LengDocument, Lib, LibDocument, TechBase } from "@/core/domain/entities/Tech";
import { MongooseRepository } from "./mongoose-base";
import { FrameworksModel, LenguajesModel, LibreriasModel } from "@/models/tech-schema";

export class LibreriaRepository extends MongooseRepository<TechBase, Lib, LibDocument> {
    constructor() {
      super(LibreriasModel);
    }
  }
  
  export class FrameworkRepository extends MongooseRepository<TechBase, Fw, FwDocument> {
    constructor() {
      super(FrameworksModel);
    }
  }
  
  export class LenguajesRepository extends MongooseRepository<TechBase, Leng, LengDocument> {
    constructor() {
      super(LenguajesModel);
    }
  }