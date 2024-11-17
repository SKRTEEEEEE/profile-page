import { MongooseBase, MongooseDocument } from "../types";
import { MongooseDeleteI } from "../types/implementations";
import { MongooseBaseRepository } from "./base.repository";

export class MongooseDeleteByIdRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
> extends MongooseBaseRepository<TBase, TPrimary, TDocument> implements MongooseDeleteI{
  async deleteById(id: string): Promise<boolean> {
    await this.connect();
    const result: TDocument|null = await this.Model.findByIdAndDelete(id);
    return !!result;
  }
}