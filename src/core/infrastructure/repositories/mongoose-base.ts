import { Model, Document, UpdateQuery, FilterQuery, QueryOptions, ProjectionType } from 'mongoose';
import { MongoDbConnection } from '../connectors/mongo-db';



export class MongooseRepository<
  TPrimary extends { id: string; createdAt: string; updatedAt: string },
  TBase 
  extends Document
> extends MongoDbConnection {
  constructor(protected Model: Model<any, {}, {}, {}, any, any>) {
    super();
  }

  async create(data: Omit<TPrimary, 'id' | 'createdAt' | 'updatedAt'>): Promise<TPrimary> {
    await this.connect();
    const newDocument = new this.Model(data);
    const savedDocument = await newDocument.save();
    return this.documentToPrimary(savedDocument);
  }

  async readById(id: string): Promise<TPrimary | null> {
    await this.connect();
    const document = await this.Model.findById(id);
    return document ? this.documentToPrimary(document) : null;
  }
  async read(filter: FilterQuery<any>, projection?: ProjectionType<any> | null | undefined, options?: QueryOptions<any> | null | undefined): Promise<TPrimary[] | null>{
    await this.connect()
    const docs = await this.Model.find(filter,projection,options)
    return docs ? docs.map(doc=>(this.documentToPrimary(doc))):null

  }

  async updateById(
    id: string,
    updateData: UpdateQuery<TBase>
  ): Promise<TPrimary | null> {
    await this.connect();
    const updatedDocument = await this.Model.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return updatedDocument ? this.documentToPrimary(updatedDocument) : null;
  }
  async update(filter?: FilterQuery<TBase> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TPrimary | null> {
    await this.connect()
    const updatedDocument = await this.Model.findOneAndUpdate(filter, update, options)
    return updatedDocument ? this.documentToPrimary(updatedDocument): null
  }

  async delete(id: string): Promise<boolean> {
    await this.connect();
    const result = await this.Model.findByIdAndDelete(id);
    return !!result;
  }

  // Método para convertir un documento Mongoose en un objeto de dominio
  protected documentToPrimary(document: TBase): TPrimary {
    const { _id, createdAt, updatedAt, ...rest } = document.toObject();
    return {
      id: _id.toString(),
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      ...rest,
    } as TPrimary;
  }
}
