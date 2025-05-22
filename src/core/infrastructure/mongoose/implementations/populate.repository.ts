import { DatabaseActionError, InputParseError } from "@/core/domain/flows/domain.error";
import { MongooseBase, MongooseDocument } from "../types";
import { MongoosePopulateI } from "../types/implementations";
import { MongooseBaseRepository } from "./base.repository";
import { Model } from "mongoose";

export type MongoosePopulateProps<TBase> = Array<TBase>
export type MongoosePopulateResponse<TBase> = Promise<(TBase & MongooseBase)[]>

export class MongoosePopulateRepository<
    TBase,
    TOptions extends Partial<Record<keyof TBase & MongooseBase, (value: any) => any>> = {}
    > extends MongooseBaseRepository<TBase, TOptions> 
    implements MongoosePopulateI<TBase>
    {
        constructor(Model: Model<any, {}, {}, {}, any, any>, parseOpt?: TOptions) {
            super(Model, parseOpt);
        }
        async populate(docs: MongoosePopulateProps<TBase>): MongoosePopulateResponse<TBase> {
            if(docs.length === 0) throw new InputParseError("No documents to populate")
            await this.connect()
            try {
                const res = await this.Model.insertMany(docs)         
                return res.map(doc => this.documentToPrimary(doc as (TBase & MongooseDocument)))
            } catch (error) {   
                console.error("Error al poblar documentos:", error);
                throw new DatabaseActionError("Error en la operación de poblado");
            }
        }
    }