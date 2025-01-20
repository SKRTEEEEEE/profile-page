import { Model } from "mongoose";
import { MongooseBaseRepository } from "../implementations/base.repository";
import {  MongooseReadRepository, MongooseReadResponse } from "../implementations/read.repository";
import { MongoosePopulateProps, MongoosePopulateRepository, MongoosePopulateResponse } from "../implementations/populate.repository";
import { MongooseReadProps } from "../types/implementations";

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
    async populate(docs: MongoosePopulateProps<TBase>): MongoosePopulateResponse<TBase> {
        return await this.populateRepo.populate(docs);
    }

  
}