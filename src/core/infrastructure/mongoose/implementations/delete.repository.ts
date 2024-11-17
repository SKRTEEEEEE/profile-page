import { MongooseBase, MongooseDocument } from "../types";
import { MongooseDeleteI } from "../types/implementations";
import { MongooseBaseRepository } from "./base.repository";

export class MongooseDeleteRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
> extends MongooseBaseRepository<TBase, TPrimary, TDocument> implements MongooseDeleteI<TDocument>{
  async delete(id: string): Promise<boolean> {
    await this.connect();
    const result: TDocument|null = await this.Model.findByIdAndDelete(id);
    return !!result;
  }
}