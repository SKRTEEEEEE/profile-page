import { FilterQuery, QueryOptions } from "mongoose"
import { MongooseBaseRepository } from "./base.repository"
import { UpdateQuery } from "mongoose"
import { MongooseBase, MongooseDocument } from "../types"
import { MongooseUpdateI } from "../types/implementations"

export class MongooseUpdateRepository<
TBase,
> extends MongooseBaseRepository<TBase> implements MongooseUpdateI<TBase>{
  // -> findOneAndUpdate
  async update(filter?: FilterQuery<TBase & MongooseBase> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TBase & MongooseBase | null> {
    await this.connect()
    const updatedDocument: TBase & MongooseDocument|null = await this.Model.findOneAndUpdate(filter, update, options)
    return updatedDocument ? this.documentToPrimary(updatedDocument) as TBase & MongooseBase: null
}
}