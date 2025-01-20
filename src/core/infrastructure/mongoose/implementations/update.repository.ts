import { MongooseBaseRepository } from "./base.repository"
import { MongooseBase, MongooseDocument } from "../types"
import { MongooseUpdateI, MongooseUpdateProps } from "../types/implementations"


export class MongooseUpdateRepository<
TBase,
> extends MongooseBaseRepository<TBase> implements MongooseUpdateI<TBase>{
  // -> findOneAndUpdate
  async update({filter, update, options}: MongooseUpdateProps<TBase>): Promise<(TBase & MongooseBase) | null> {
    await this.connect()
    const updatedDocument: TBase & MongooseDocument|null = await this.Model.findOneAndUpdate(filter, update, options)
    return updatedDocument ? this.documentToPrimary(updatedDocument) as TBase & MongooseBase: null
}
}