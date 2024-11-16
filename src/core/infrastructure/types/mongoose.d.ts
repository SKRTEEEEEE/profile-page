import mongoose, { Document, QueryOptions, UpdateQuery } from "mongoose"

export type MongooseBaseRepository<
TBase,
TPrimary extends TBase & MongooseBase,
> = {
  create(data: Omit<TBase, 'id' >): Promise<TPrimary>
  readById(id: string): Promise<TPrimary | null>
  read(filter?: FilterQuery<TPrimary>, projection?: ProjectionType<any> | null | undefined, options?: QueryOptions<any> | null | undefined): Promise<TPrimary[] | null>
  updateById(id: string,
    updateData?: UpdateQuery<TBase> | undefined,
    options?: QueryOptions<any> | null | undefined & { includeResultMetadata: true; lean: true; }
  ): Promise<TPrimary | null>
  update(filter?: FilterQuery<TPrimary> | undefined, update?: UpdateQuery<TBase> | undefined, options?: QueryOptions<TBase> | null | undefined): Promise<TPrimary | null>
  delete(id:string):Promise<boolean>
}
export type MongooseBase = {
    id: string
    createdAt: string
    updatedAt: string
  }
  export type TimestampBase = {
     createdAt: Date;
     updatedAt: Date;
 }
export type MongooseDocument = Document