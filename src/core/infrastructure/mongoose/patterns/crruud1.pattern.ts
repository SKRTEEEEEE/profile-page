import { Model, ProjectionType, UpdateQuery } from "mongoose";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseDeleteByIdRepository } from "../implementations/delete.repository";
import { MongooseReadRepository } from "../implementations/read.repository";
import { MongooseUpdateRepository } from "../implementations/update.repository";
import { FilterQuery } from "mongoose";
import { QueryOptions } from "mongoose";
import { MongooseBase } from "../types";
import { MongooseCRURepository } from "../implementations/cru.repository";
import { MongooseCRRUUD1 } from "../types/patterns";

/* 
  - crruud v1

  deleteById
*/
export abstract class MongooseCRRUUD1Pattern<
  TBase,
  TOptions extends Partial<Record<keyof TBase & MongooseBase, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TOptions> implements MongooseCRRUUD1<TBase> {
  private cruRepo: MongooseCRURepository<TBase>
  private readRepo: MongooseReadRepository<TBase>;
  private updateRepo: MongooseUpdateRepository<TBase>
  private deleteRepo: MongooseDeleteByIdRepository<TBase>;


  constructor(Model: Model<any, {}, {}, {}, any, any>, parseOpt?: TOptions) {
    super(Model, parseOpt);

    this.readRepo = new MongooseReadRepository(this.Model);
    this.deleteRepo = new MongooseDeleteByIdRepository(this.Model);
    this.updateRepo = new MongooseUpdateRepository(this.Model)
    this.cruRepo = new MongooseCRURepository(this.Model)

  }
  async create(
    data: Omit<TBase, 'id'>
  )
    : Promise<TBase & MongooseBase> {
    return await this.cruRepo.create(data)
  }
  async readById(
    id: string
  )
    : Promise<TBase & MongooseBase | null> {
    return await this.cruRepo.readById(id)
  }
  async read(
    filter?: FilterQuery<TBase & MongooseBase>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
  ): Promise<(TBase & MongooseBase)[] | null> {
    // Asumiendo que tienes un método read en MongooseBaseRepository o necesitas implementarlo
    return await this.readRepo.read(filter, projection, options);
  }
  async updateById(id: string,
    updateData?: UpdateQuery<TBase> | undefined,
    options?: QueryOptions<any> | null | undefined & { includeResultMetadata: true; lean: true; }
  )
    : Promise<TBase & MongooseBase | null> {
    return await this.cruRepo.updateById(id, updateData, options)
  }
  async update(filter?: FilterQuery<TBase & MongooseBase> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TBase & MongooseBase | null> {
    return await this.updateRepo.update(filter, update, options)
  }
  // Implementar el método delete
  async deleteById(id: string): Promise<boolean> {
    return await this.deleteRepo.deleteById(id);
  }

}
