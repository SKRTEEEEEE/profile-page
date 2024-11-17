import { Model, QueryOptions } from "mongoose";
import { MongoDbConnection } from "../../connectors/mongo-db";
import { UpdateQuery } from "mongoose";
import { MongooseBase, MongooseDocument } from "../types";
import { MongooseBaseI } from "../types/implementations";


// Esta parte ya esta bien que utilize los tipos de mongoose?


export abstract class MongooseBaseRepository<
  TBase,
  TPrimary extends TBase & MongooseBase,
  TDocument extends TBase & MongooseDocument,
  TOptions extends Partial<Record<keyof TPrimary, (value: any) => any>> = {}
> extends MongoDbConnection
implements MongooseBaseI<TBase, TPrimary> {
  constructor(protected Model: Model<any, {}, {}, {}, any, any>, private parseOpt?: TOptions) {
    super();
  }

  async create(data: Omit<TBase, 'id'>): Promise<TPrimary> {
    await this.connect();
    const newDocument: TDocument = new this.Model(data);
    const savedDocument = await newDocument.save();
    return this.documentToPrimary(savedDocument);
  }

  async readById(id: string): Promise<TPrimary | null> {
    await this.connect();
    const document: TDocument|null = await this.Model.findById(id);
    return document ? this.documentToPrimary(document) : null;
  }

  async updateById(
    id: string,
    updateData: UpdateQuery<TBase> | undefined,
    options?: QueryOptions<any> | null | undefined & { includeResultMetadata: true; lean: true; }
  ): Promise<TPrimary | null> {
    await this.connect();
    const updatedDocument: TDocument|null = await this.Model.findByIdAndUpdate(id, updateData, (options ? options: {
      new: true,
    }));
    return updatedDocument ? this.documentToPrimary(updatedDocument) : null;
  }

  protected documentToPrimary(document: TDocument): TPrimary {
    const { _id, createdAt, updatedAt, ...rest } = document.toObject();
  
    const result: Partial<TPrimary> = {
      id: _id.toString(),
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      ...rest,
    };
  
    // Aplicar las transformaciones especificadas en las opciones
    if (this.parseOpt) {
      Object.entries(this.parseOpt).forEach(([key, transformFn]) => {
        if (key in result) {
          result[key as keyof TPrimary] = transformFn(result[key as keyof TPrimary]);
        }
      });
    }
    return result as TPrimary;
  }
}