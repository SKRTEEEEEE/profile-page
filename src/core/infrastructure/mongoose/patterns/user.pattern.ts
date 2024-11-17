import { Model, ProjectionType, UpdateQuery } from "mongoose";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseDeleteByIdRepository } from "../implementations/delete.repository";
import { MongooseReadRepository } from "../implementations/read.repository";
import { MongooseUpdateRepository } from "../implementations/update.repository";
import { FilterQuery } from "mongoose";
import { QueryOptions } from "mongoose";
import { UserRepository } from "@/core/application/interfaces/entities/user";
import { MongooseBase, MongooseDocument } from "../types";

export abstract class MongooseUserPattern<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
TOptions extends Partial<Record<keyof TPrimary, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TPrimary, TDocument, TOptions> implements UserRepository<TBase, TPrimary, TDocument>{
  private readRepo: MongooseReadRepository<TBase, TPrimary, TDocument>;
  private deleteRepo: MongooseDeleteByIdRepository<TBase, TPrimary, TDocument>;
  private updateRepo: MongooseUpdateRepository<TBase, TPrimary, TDocument>

  constructor(Model: Model<any, {}, {}, {}, any, any>,parseOpt: TOptions) {
    super(Model, parseOpt);

    this.readRepo = new MongooseReadRepository(this.Model);
    this.deleteRepo = new MongooseDeleteByIdRepository(this.Model);
    this.updateRepo = new MongooseUpdateRepository(this.Model)
  }
  // Implementar el método delete
  async deleteById(id: string): Promise<boolean> {
    return await this.deleteRepo.deleteById(id);
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
