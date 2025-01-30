import { MongooseBaseRepository } from "./base.repository";
import { MongooseBase } from "../types";
import { MongooseReadI, MongooseReadProps } from "../types/implementations";
import { Model } from "mongoose";


export type MongooseReadResponse<TBase> = Promise<(TBase & MongooseBase)[] | []>

export class MongooseReadRepository<
TBase,
TOptions extends Partial<Record<keyof TBase & MongooseBase, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TOptions> implements MongooseReadI<TBase>{
    constructor(Model: Model<any, {}, {}, {}, any, any>, parseOpt?: TOptions) {
        super(Model, parseOpt);
    }
    // -> Read All
    async read(
      {filter, projection, options}: MongooseReadProps<TBase> 
    ): Promise<(TBase & MongooseBase)[]> {
      try {
        await this.connect();
        const docs = await this.Model.find(filter || {}, projection, options) // Usa un objeto vacío si filter es undefined
        return docs.map(user=>this.documentToPrimary(user))
      } catch (error) {
        console.error("Error al leer documentos:", error);
        throw new Error("Error en la operación de lectura");
      }
    }
}