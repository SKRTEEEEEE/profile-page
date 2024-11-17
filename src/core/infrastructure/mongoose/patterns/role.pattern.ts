import { FilterQuery, Model, QueryOptions } from "mongoose";
import { MongooseBase, MongooseDocument } from "../types";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseReadRepository } from "../implementations/read.repository";
import { ProjectionType } from "mongoose";
import { MongooseDeleteByIdRepository } from "../implementations/delete.repository";
import { RoleRepository } from "@/core/application/interfaces/entities/role";


export abstract class MongooseRolePattern<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
TOptions extends Partial<Record<keyof TPrimary, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TPrimary, TDocument, TOptions> implements RoleRepository<TBase, TPrimary, TDocument>{
  private readRepo: MongooseReadRepository<TBase, TPrimary, TDocument>;
  private deleteRepo: MongooseDeleteByIdRepository<TBase, TPrimary, TDocument>;

  constructor(Model: Model<any, {}, {}, {}, any, any>) {
    super(Model);

    this.readRepo = new MongooseReadRepository(this.Model);
    this.deleteRepo = new MongooseDeleteByIdRepository(this.Model);
  }
  // Implementar el método delete
  async delete(id: string): Promise<boolean> {
    return this.deleteRepo.deleteById(id);
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