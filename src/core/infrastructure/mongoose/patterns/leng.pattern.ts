import { FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { MongooseBase } from "../types";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseReadRepository } from "../implementations/read.repository";
import { ProjectionType } from "mongoose";
import { LengRepository } from "@/core/application/interfaces/entities/tech";
import { MongooseCRURepository } from "../implementations/cru.repository";

export abstract class MongooseLengPattern<
TBase,
TOptions extends Partial<Record<keyof TBase & MongooseBase, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TOptions> implements LengRepository<TBase>{
  private readRepo: MongooseReadRepository<TBase>;
  private cruRepo: MongooseCRURepository<TBase>

  constructor(Model: Model<any, {}, {}, {}, any, any>) {
    super(Model);
    this.readRepo = new MongooseReadRepository(this.Model);
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
  async updateById(id: string,
    updateData?: UpdateQuery<TBase> | undefined,
    options?: QueryOptions<any> | null | undefined & { includeResultMetadata: true; lean: true; }
  )
    : Promise<TBase & MongooseBase | null> {
      return await this.cruRepo.updateById(id,updateData,options)
    }
  async read(
    filter?: FilterQuery<TBase & MongooseBase>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
  ): Promise<(TBase & MongooseBase)[] | null> {
    return this.readRepo.read(filter, projection, options);
  }
}
