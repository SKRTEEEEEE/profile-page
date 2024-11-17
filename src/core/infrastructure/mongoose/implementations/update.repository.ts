import { FilterQuery, QueryOptions } from "mongoose"
import { MongooseBaseRepository } from "./base.repository"
import { UpdateQuery } from "mongoose"
import { MongooseBase, MongooseDocument } from "../types"
import { MongooseUpdateI } from "../types/implementations"

export class MongooseUpdateRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
> extends MongooseBaseRepository<TBase, TPrimary, TDocument> implements MongooseUpdateI<TBase, TPrimary>{
  // -> findOneAndUpdate
  async update(filter?: FilterQuery<TPrimary> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TPrimary | null> {
    await this.connect()
    const updatedDocument: TDocument|null = await this.Model.findOneAndUpdate(filter, update, options)
    return updatedDocument ? this.documentToPrimary(updatedDocument): null
}
}