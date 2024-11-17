import { FilterQuery, Query, QueryOptions } from "mongoose";
import { MongooseBase, MongooseDocument } from "../types";
import { MongooseDeleteByIdI, MongooseDeleteI } from "../types/implementations";
import { MongooseBaseRepository } from "./base.repository";

export class MongooseDeleteByIdRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
> extends MongooseBaseRepository<TBase, TPrimary, TDocument> implements MongooseDeleteByIdI{
  async deleteById(id: string): Promise<boolean> {
    await this.connect();
    const result: TDocument|null = await this.Model.findByIdAndDelete(id);
    return !!result;
  }
}
export class MongooseDeleteRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
> extends MongooseBaseRepository<TBase, TPrimary, TDocument> implements MongooseDeleteI{
  async delete(filter?: FilterQuery<any> | null | undefined, options?: QueryOptions<any> | null | undefined): Query<any, any, {}, any, "findOneAndDelete", {}> {
    await this.connect();
    return await this.Model.findOneAndDelete(filter, options)
  }
}
