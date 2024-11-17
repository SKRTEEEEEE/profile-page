import { Model, UpdateQuery, FilterQuery, QueryOptions, ProjectionType } from 'mongoose';
import { MongoDbConnection } from '../connectors/mongo-db';
import { MongooseBase, MongooseBaseI, MongooseDeleteI, MongooseDocument, MongooseReadI, MongooseUpdateI } from '@/core/infrastructure/types/mongoose';
import { Query } from 'mongoose';
import { RoleRepository } from '@/core/application/interfaces/entities/role';
import { UserRepository } from '@/core/application/interfaces/entities/user';


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
export abstract class MongooseRolePattern<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
TOptions extends Partial<Record<keyof TPrimary, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TPrimary, TDocument, TOptions> implements RoleRepository<TBase, TPrimary, TDocument>{
  private readRepo: MongooseReadRepository<TBase, TPrimary, TDocument>;
  private deleteRepo: MongooseDeleteRepository<TBase, TPrimary, TDocument>;

  constructor(Model: Model<any, {}, {}, {}, any, any>) {
    super(Model);

    this.readRepo = new MongooseReadRepository(this.Model);
    this.deleteRepo = new MongooseDeleteRepository(this.Model);
  }
  // Implementar el método delete
  async delete(id: string): Promise<boolean> {
    return this.deleteRepo.delete(id);
  }
  async read(
    filter?: FilterQuery<TPrimary>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
  ): Promise<TPrimary[] | null> {
    // Asumiendo que tienes un método read en MongooseBaseRepository o necesitas implementarlo
    return this.readRepo.read(filter, projection, options);
  }
}
export abstract class MongooseUserPattern<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
TOptions extends Partial<Record<keyof TPrimary, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TPrimary, TDocument, TOptions> implements UserRepository<TBase, TPrimary, TDocument>{
  private readRepo: MongooseReadRepository<TBase, TPrimary, TDocument>;
  private deleteRepo: MongooseDeleteRepository<TBase, TPrimary, TDocument>;
  private updateRepo: MongooseUpdateRepository<TBase, TPrimary, TDocument>

  constructor(Model: Model<any, {}, {}, {}, any, any>,parseOpt: TOptions) {
    super(Model, parseOpt);

    this.readRepo = new MongooseReadRepository(this.Model);
    this.deleteRepo = new MongooseDeleteRepository(this.Model);
    this.updateRepo = new MongooseUpdateRepository(this.Model)
  }
  // Implementar el método delete
  async delete(id: string): Promise<boolean> {
    return await this.deleteRepo.delete(id);
  }
  async read(
    filter?: FilterQuery<TPrimary>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
  ): Promise<TPrimary[] | null> {
    // Asumiendo que tienes un método read en MongooseBaseRepository o necesitas implementarlo
    return await this.readRepo.read(filter, projection, options);
  }
  async update(filter?: FilterQuery<TPrimary> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TPrimary | null>{
    return await this.updateRepo.update(filter, update, options)
  }
}
class MongooseDeleteRepository<
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

class MongooseUpdateRepository<
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

class MongooseReadRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
> extends MongooseBaseRepository<TBase, TPrimary, TDocument> implements MongooseReadI<TPrimary>{
    // -> Read All
    async read(
      filter?: FilterQuery<TPrimary>,
      projection?: ProjectionType<any> | null,
      options?: QueryOptions<any> | null
    ): Query<TPrimary[], any, {}, any, "find", {}> {
      try {
        await this.connect();
        const docs = await this.Model.find(filter || {}, projection, options) // Usa un objeto vacío si filter es undefined
        return docs.map(user=>this.documentToPrimary(user))
      } catch (error) {
        console.error("Error al leer documentos:", error);
        throw new Error("Error en la operación de lectura");
      }
    }
}