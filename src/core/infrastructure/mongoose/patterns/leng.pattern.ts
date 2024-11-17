import { FilterQuery, Model, QueryOptions } from "mongoose";
import { MongooseBase, MongooseDocument } from "../types";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseReadRepository } from "../implementations/read.repository";
import { ProjectionType } from "mongoose";
import { LengRepository } from "@/core/application/interfaces/entities/tech";

export abstract class MongooseLengPattern<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
TOptions extends Partial<Record<keyof TPrimary, (value: any) => any>> = {}
> extends MongooseBaseRepository<TBase, TPrimary, TDocument, TOptions> implements LengRepository<TBase, TPrimary>{
  private readRepo: MongooseReadRepository<TBase, TPrimary, TDocument>;
  constructor(Model: Model<any, {}, {}, {}, any, any>) {
    super(Model);

    this.readRepo = new MongooseReadRepository(this.Model);
  
  }
  async read(
    filter?: FilterQuery<TPrimary>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions<any> | null
  ): Promise<TPrimary[] | null> {
    return this.readRepo.read(filter, projection, options);
  }
}
