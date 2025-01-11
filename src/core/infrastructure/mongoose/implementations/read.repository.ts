import { FilterQuery, Query } from "mongoose";
import { MongooseBaseRepository } from "./base.repository";
import { ProjectionType } from "mongoose";
import { QueryOptions } from "mongoose";
import { MongooseBase } from "../types";
import { MongooseReadI } from "../types/implementations";

export type MongooseReadProps<TBase> = {
  filter?: FilterQuery<TBase & MongooseBase> | undefined,
  projection?: ProjectionType<any> | null | undefined,
  options?: QueryOptions<any> | null | undefined
}
export type MongooseReadResponse<TBase> = Promise<(TBase & MongooseBase)[] | []>

export class MongooseReadRepository<
TBase,
> extends MongooseBaseRepository<TBase> implements MongooseReadI<TBase>{
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