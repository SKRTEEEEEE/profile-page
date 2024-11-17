import { FilterQuery, Model, Query, QueryOptions, UpdateQuery } from "mongoose";
import { MongooseBase, MongooseDocument } from "../types";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseReadRepository } from "../implementations/read.repository";
import { ProjectionType } from "mongoose";
import { MongooseDeleteByIdRepository, MongooseDeleteRepository } from "../implementations/delete.repository";
import { MongooseUpdateRepository } from "../implementations/update.repository";
import { RoleRepository } from "@/core/application/interfaces/entities/role";


export abstract class MongooseRolePattern<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
TOptions extends Partial<Record<keyof TPrimary, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TPrimary, TDocument, TOptions> implements RoleRepository<TBase, TPrimary, TDocument>{
  private readRepo: MongooseReadRepository<TBase, TPrimary, TDocument>;
  private deleteByIdRepo: MongooseDeleteByIdRepository<TBase, TPrimary, TDocument>;
  private deleteRepo: MongooseDeleteRepository<TBase, TPrimary, TDocument>
  private updateRepo: MongooseUpdateRepository<TBase, TPrimary, TDocument>

  constructor(Model: Model<any, {}, {}, {}, any, any>) {
    super(Model);

    this.readRepo = new MongooseReadRepository(this.Model);
    this.deleteByIdRepo = new MongooseDeleteByIdRepository(this.Model);
    this.deleteRepo = new MongooseDeleteRepository(this.Model)
    this.updateRepo = new MongooseUpdateRepository(this.Model)
  }
  // Implementar el método delete
  async deleteById(id: string): Promise<boolean> {
    return this.deleteByIdRepo.deleteById(id);
    
  }
  async read(
    filter?: FilterQuery<TPrimary>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
  ): Promise<TPrimary[] | null> {
    // Asumiendo que tienes un método read en MongooseBaseRepository o necesitas implementarlo
    return this.readRepo.read(filter, projection, options);
  }
  async delete(filter?: FilterQuery<any> | null | undefined, options?: QueryOptions<any> | null | undefined): Query<any, any, {}, any, "findOneAndDelete", {}>{
    return this.deleteRepo.delete(filter, options)
  }
  async update(filter?: FilterQuery<TPrimary> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TPrimary | null>{
    return this.updateRepo.update(filter, update, options)
  }
}