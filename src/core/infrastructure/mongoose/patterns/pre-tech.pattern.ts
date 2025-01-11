import { Model, Mongoose } from "mongoose";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseReadProps, MongooseReadRepository, MongooseReadResponse } from "../implementations/read.repository";
import { MongooseBase } from "../types";
import { MongoosePopulateRepository } from "../implementations/populate.repository";

/* 
primario, proviene de las implementaciones
Aquí solo se implementan patrones de repositorios
*/
export abstract class MongoosePreTechPattern<
    TBase
> extends MongooseBaseRepository<TBase>
    {
    private readRepo: MongooseReadRepository<TBase>;
    private populateRepo: MongoosePopulateRepository<TBase>;
   
    constructor(Model: Model<any, {}, {}, {}, any, any>) {
        super(Model);
        this.readRepo = new MongooseReadRepository(this.Model);
        this.populateRepo = new MongoosePopulateRepository(this.Model);
    }
    async read(
        props: MongooseReadProps<TBase>
    ): MongooseReadResponse<TBase> {
        return await this.readRepo.read(props);
    }
    async populate(docs: Array<TBase>): Promise<(TBase & MongooseBase)[]> {
        return await this.populateRepo.populate(docs);
    }

  
}