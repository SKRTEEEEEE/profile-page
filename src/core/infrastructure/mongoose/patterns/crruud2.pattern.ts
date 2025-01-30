import { Model, Query } from "mongoose";
import { MongooseBase } from "../types";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseReadRepository, MongooseReadResponse } from "../implementations/read.repository";
import { MongooseCRURepository } from "../implementations/cru.repository";
import { MongooseDeleteRepository } from "../implementations/delete.repository";
import { MongooseUpdateRepository } from "../implementations/update.repository";
import { MongooseCRRUUD2 } from "../types/patterns";
import { MongooseDeleteProps, MongooseReadProps, MongooseUpdateByIdProps, MongooseUpdateProps } from "../types/implementations";

// -> crruud v2 - (not used still -old tech.pattern)

export abstract class MongooseCRRUUD2Pattern<
  TBase> extends MongooseBaseRepository<TBase> implements MongooseCRRUUD2<TBase> {
  private cruRepo: MongooseCRURepository<TBase>
  private readRepo: MongooseReadRepository<TBase>;
  private deleteRepo: MongooseDeleteRepository<TBase>
  private updateRepo: MongooseUpdateRepository<TBase>


  constructor(Model: Model<any, {}, {}, {}, any, any>) {
    super(Model);
    this.cruRepo = new MongooseCRURepository(this.Model)
    this.readRepo = new MongooseReadRepository(this.Model);
    this.updateRepo = new MongooseUpdateRepository(this.Model)
    this.deleteRepo = new MongooseDeleteRepository(this.Model)
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
    props: MongooseReadProps<TBase>
  ): MongooseReadResponse<TBase> {
    return await this.readRepo.read(props);
  }
  async updateById(props: MongooseUpdateByIdProps<TBase>
  )
    : Promise<TBase & MongooseBase | null> {
    return await this.cruRepo.updateById(props)
  }
  async update(props: MongooseUpdateProps<TBase>): Promise<TBase & MongooseBase | null> {
    return await this.updateRepo.update(props)
  }
  async delete(
    props: MongooseDeleteProps<TBase>
  ): Promise<Query<any, any, {}, any, "findOneAndDelete", {}>> {
    return this.deleteRepo.delete(props)
  }
}
