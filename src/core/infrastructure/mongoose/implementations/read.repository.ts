import { FilterQuery } from "mongoose";
import { MongooseBaseRepository } from "./base.repository";
import { ProjectionType } from "mongoose";
import { QueryOptions } from "mongoose";
import { Query } from "mongoose";
import { MongooseBase, MongooseDocument } from "../types";
import { MongooseReadI } from "../types/implementations";

export class MongooseReadRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
> extends MongooseBaseRepository<TBase, TPrimary, TDocument> implements MongooseReadI<TPrimary>{
    // -> Read All
    async read(
      filter?: FilterQuery<TPrimary>,
      projection?: ProjectionType<any> | null,
      options?: QueryOptions<any> | null
    ): Query<TPrimary[], any, {}, any, "find", {}> {
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