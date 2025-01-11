import { DatabaseOperationError, InputParseError } from "@/core/domain/errors/main";
import { MongooseBase, MongooseDocument } from "../types";
import { MongoosePopulateI } from "../types/implementations";
import { MongooseBaseRepository } from "./base.repository";

export type MongoosePopulateProps<TBase> = Array<TBase>
export type MongoosePopulateResponse<TBase> = Promise<(TBase & MongooseBase)[]>

export class MongoosePopulateRepository<
    TBase
    > extends MongooseBaseRepository<TBase> 
    implements MongoosePopulateI<TBase>
    {
        async populate(docs: MongoosePopulateProps<TBase>): MongoosePopulateResponse<TBase> {
            if(docs.length === 0) throw new InputParseError("No documents to populate")
            await this.connect()
            try {
                const res = await this.Model.insertMany(docs)         
                return res.map(doc => this.documentToPrimary(doc as (TBase & MongooseDocument)))
            } catch (error) {   
                console.error("Error al poblar documentos:", error);
                throw new DatabaseOperationError("Error en la operación de poblado");
            }
        }
    }