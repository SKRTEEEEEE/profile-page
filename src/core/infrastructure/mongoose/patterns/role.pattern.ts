import {  Model, Query } from "mongoose";
import { MongooseBase } from "../types";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseReadRepository, MongooseReadResponse } from "../implementations/read.repository";
import { MongooseDeleteByIdRepository, MongooseDeleteRepository } from "../implementations/delete.repository";
import { RoleRepository } from "@/core/application/interfaces/entities/role";
import { MongooseCRURepository } from "../implementations/cru.repository";
import { MongooseDeleteProps, MongooseReadProps, MongooseUpdateByIdProps } from "../types/implementations";

// crrudd 

export abstract class MongooseRolePattern<
TBase> extends MongooseBaseRepository<TBase> implements RoleRepository<TBase>{
  private cruRepo: MongooseCRURepository<TBase>
  private readRepo: MongooseReadRepository<TBase>;
  private deleteByIdRepo: MongooseDeleteByIdRepository<TBase>;
  private deleteRepo: MongooseDeleteRepository<TBase>

  constructor(Model: Model<any, {}, {}, {}, any, any>) {
    super(Model);

    this.readRepo = new MongooseReadRepository(this.Model);
    this.deleteByIdRepo = new MongooseDeleteByIdRepository(this.Model);
    this.deleteRepo = new MongooseDeleteRepository(this.Model)
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
  async updateById(props: MongooseUpdateByIdProps<TBase>
  )
    : Promise<TBase & MongooseBase | null> {
      return await this.cruRepo.updateById(props)
    }
  // Implementar el método delete
  async deleteById(id: string): Promise<boolean> {
    return this.deleteByIdRepo.deleteById(id);
    
  }
  async read(
    props: MongooseReadProps<TBase>
  ): MongooseReadResponse<TBase> {
    return await this.readRepo.read(props);
  }
  async delete(props: MongooseDeleteProps<TBase>): Promise<Query<any, any, {}, any, "findOneAndDelete", {}>>{
    return this.deleteRepo.delete(props)
  }
}