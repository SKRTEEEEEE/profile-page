import mongoose, { Document } from "mongoose"

export type MongooseBaseRepository<
TBase,
TPrimary extends TBase & MongooseBase,
> = {
  create(data: Omit<TPrimary, 'id' | 'createdAt' | 'updatedAt'>): Promise<TPrimary>
  readById(id: string): Promise<TPrimary | null>
  updateById(id: string,
    updateData: UpdateQuery<TBase>,
    options?: QueryOptions<any> & { includeResultMetadata: true; lean: true; }
  ): Promise<TPrimary | null>
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