import { QueryOptions, UpdateQuery } from "mongoose";
import { MongooseBase, MongooseDocument } from "../types";
import { MongooseCRUI } from "../types/implementations";
import { MongooseBaseRepository } from "./base.repository";

export class MongooseCRURepository<
TBase,
> extends MongooseBaseRepository<TBase> implements MongooseCRUI<TBase>{
    async create(data: Omit<TBase, 'id'>): Promise<TBase & MongooseBase> {
        await this.connect();
        const newDocument: TBase & MongooseDocument = new this.Model(data);
        const savedDocument = await newDocument.save();
        return this.documentToPrimary(savedDocument);
      }
    
      async readById(id: string): Promise<TBase & MongooseBase | null> {
        await this.connect();
        const document: TBase & MongooseDocument|null = await this.Model.findById(id);
        return document ? this.documentToPrimary(document) : null;
      }
    
      async updateById(
        id: string,
        updateData: UpdateQuery<TBase> | undefined,
        options?: QueryOptions<any> | null | undefined & { includeResultMetadata: true; lean: true; }
      ): Promise<TBase & MongooseBase | null> {
        await this.connect();
        const updatedDocument: TBase & MongooseDocument|null = await this.Model.findByIdAndUpdate(id, updateData, (options ? options: {
          new: true,
        }));
        return updatedDocument ? this.documentToPrimary(updatedDocument) : null;
      }
}