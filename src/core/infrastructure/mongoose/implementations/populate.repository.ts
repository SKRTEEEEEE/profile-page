import { MongooseBase, MongooseDocument } from "../types";
import { MongoosePopulateI } from "../types/implementations";
import { MongooseBaseRepository } from "./base.repository";

export class MongoosePopulateRepository<
    TBase
    > extends MongooseBaseRepository<TBase> 
    implements MongoosePopulateI<TBase>
    {
        async populate(docs: Array<TBase>): Promise<(TBase & MongooseBase)[]> {
            await this.connect()
            const res = await this.Model.insertMany(docs)         
            return res.map(doc => this.documentToPrimary(doc as (TBase & MongooseDocument)))
        }
    }