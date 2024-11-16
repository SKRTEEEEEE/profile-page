import mongoose, { Model, Document, UpdateQuery, FilterQuery, QueryOptions, ProjectionType } from 'mongoose';
import { MongoDbConnection } from '../connectors/mongo-db';
import { MongooseBase, MongooseBaseRepository } from '@/core/infrastructure/types/mongoose';



export abstract class MongooseRepository<
  TBase,
  TPrimary extends TBase & MongooseBase,
  TDocument extends TBase & mongoose.Document,
  TOptions extends Partial<Record<keyof TPrimary, (value: any) => any>> = {}
> extends MongoDbConnection
implements MongooseBaseRepository<TBase, TPrimary> {
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
  // -> Read All
  async read(
    filter?: FilterQuery<TPrimary>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
  ): Promise<TPrimary[]|null> {
    try {
      await this.connect();
      const docs = await this.Model.find(filter || {}, projection, options) // Usa un objeto vacío si filter es undefined
      return docs.length > 0 ? docs.map(user=>this.documentToPrimary(user)):null
    } catch (error) {
      console.error("Error al leer documentos:", error);
      throw new Error("Error en la operación de lectura");
    }
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
  // -> findOneAndUpdate
    async update(filter?: FilterQuery<TPrimary> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TPrimary | null> {
        await this.connect()
        const updatedDocument: TDocument|null = await this.Model.findOneAndUpdate(filter, update, options)
        return updatedDocument ? this.documentToPrimary(updatedDocument): null
    }

  async delete(id: string): Promise<boolean> {
    await this.connect();
    const result: TDocument|null = await this.Model.findByIdAndDelete(id);
    return !!result;
  }

  // protected documentToPrimary(document: TDocument,): TPrimary {
  //   const { _id, createdAt, updatedAt, ...rest } = document.toObject();
  //   return {
  //     id: _id.toString(),
  //     createdAt: createdAt.toISOString(),
  //     updatedAt: updatedAt.toISOString(),
  //     ...rest,
  //   } as TPrimary;
  // }
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
