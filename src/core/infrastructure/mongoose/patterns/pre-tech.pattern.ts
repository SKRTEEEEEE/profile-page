import { Model } from "mongoose";
import { MongooseBaseRepository } from "../implementations/base.repository";
import {  MongooseReadRepository, MongooseReadResponse } from "../implementations/read.repository";
import { MongoosePopulateProps, MongoosePopulateRepository, MongoosePopulateResponse } from "../implementations/populate.repository";
import { MongooseReadProps } from "../types/implementations";
import { MongooseBase } from "../types";

/* 
primario, proviene de las implementaciones
Aquí solo se implementan patrones de repositorios
- para utilizar las TOptions, se debe implementar en los repositorios de implementación que contiene
*/
export abstract class MongoosePreTechPattern<
    TBase,
    TOptions extends Partial<Record<keyof TBase & MongooseBase, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TOptions>
    {
    private readRepo: MongooseReadRepository<TBase, TOptions>;
    private populateRepo: MongoosePopulateRepository<TBase, TOptions>;
   
    constructor(Model: Model<any, {}, {}, {}, any, any>, parseOpt?: TOptions) {
        super(Model, parseOpt);
        this.readRepo = new MongooseReadRepository(this.Model, parseOpt);
        this.populateRepo = new MongoosePopulateRepository(this.Model, parseOpt);
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