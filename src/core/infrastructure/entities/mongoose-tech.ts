import { Fw, FwDocument, Leng, LengDocument, Lib, LibDocument, TechBase } from "@/core/domain/entities/Tech";
import { MongooseRepository } from "./mongoose-base";
import { FrameworksModel, LenguajesModel, LibreriasModel } from "@/models/tech-schema";
import { FwRepository, LengRepository, LibRepository } from "@/core/application/interfaces/entities/tech";

export class MongooseLibreriaRepository extends MongooseRepository<TechBase, Lib, LibDocument> implements LibRepository {
    constructor() {
      super(LibreriasModel);
    }
  }
  
  export class MongooseFrameworkRepository extends MongooseRepository<TechBase, Fw, FwDocument> implements FwRepository {
    constructor() {
      super(FrameworksModel);
    }
  }
  
  export class MongooseLenguajesRepository extends MongooseRepository<TechBase, Leng, LengDocument> implements LengRepository {
    constructor() {
      super(LenguajesModel);
    }
  }