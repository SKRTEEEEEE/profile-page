import mongoose, { Model, Document, UpdateQuery, FilterQuery, QueryOptions, ProjectionType } from 'mongoose';
import { MongoDbConnection } from '../connectors/mongo-db';
import { MongooseBase, MongooseBaseRepository } from '@/core/application/repositories/mongoose';



export abstract class MongooseRepository<
  TBase,
  TPrimary extends TBase & MongooseBase,
  TDocument extends TBase & mongoose.Document
> extends MongoDbConnection
implements MongooseBaseRepository<TBase, TPrimary> {
  constructor(private Model: Model<any, {}, {}, {}, any, any>) {
    super();
  }

  async create(data: Omit<TPrimary, 'id' | 'createdAt' | 'updatedAt'>): Promise<TPrimary> {
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
  // async read(filter: FilterQuery<TPrimary>, projection?: ProjectionType<any> | null | undefined, options?: QueryOptions<any> | null | undefined): Promise<TPrimary[] | null>{
  //   await this.connect()
  //   const docs = await this.Model.find(filter,projection,options)
  //   return docs ? docs.map(doc=>(this.documentToPrimary(doc))):null

  // }

  async updateById(
    id: string,
    updateData: UpdateQuery<TBase>,
    options?: QueryOptions<any> & { includeResultMetadata: true; lean: true; }
  ): Promise<TPrimary | null> {
    await this.connect();
    const updatedDocument: TDocument|null = await this.Model.findByIdAndUpdate(id, updateData, (options ? options: {
      new: true,
    }));
    return updatedDocument ? this.documentToPrimary(updatedDocument) : null;
  }
  // -> findOneAndUpdate
  // async update(filter?: FilterQuery<TPrimary> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TPrimary | null> {
  //   await this.connect()
  //   const updatedDocument: TDocument|null = await this.Model.findOneAndUpdate(filter, update, options)
  //   return updatedDocument ? this.documentToPrimary(updatedDocument): null
  // }

  async delete(id: string): Promise<boolean> {
    await this.connect();
    const result: TDocument|null = await this.Model.findByIdAndDelete(id);
    return !!result;
  }

  protected documentToPrimary(document: TDocument): TPrimary {
    const { _id, createdAt, updatedAt, ...rest } = document.toObject();
    return {
      id: _id.toString(),
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      ...rest,
    } as TPrimary;
  }
}
