import { PreTechBase } from "@/core/domain/entities/PreTech";
import { MongoosePreTechPattern } from "../patterns/pre-tech.pattern";
import { PreTechRepository } from "@/core/application/interfaces/entities/pre-tech";
import { PreTechModel } from "../schemas/pre-tech.schema";

export class MongoosePreTechRepository extends MongoosePreTechPattern<PreTechBase> implements PreTechRepository<PreTechBase> {
    constructor() {
      super(PreTechModel);
    }

  }