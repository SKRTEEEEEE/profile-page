export type MongooseBaseI<
  TBase,
  TPrimary extends TBase & MongooseBase,
> = {
  create(
    data: Omit<TBase, 'id'>
  )
    : Promise<TPrimary>
  readById(
    id: string
  )
    : Promise<TPrimary | null>
  updateById(id: string,
    updateData?: UpdateQuery<TBase> | undefined,
    options?: QueryOptions<any> | null | undefined & { includeResultMetadata: true; lean: true; }
  )
    : Promise<TPrimary | null>
}
export type MongooseDeleteI = {
  delete(
    filter?: FilterQuery<any> | null | undefined, options?: QueryOptions<any> | null | undefined
  ): Query<any, any, {}, any, "findOneAndDelete", {}>
}
export type MongooseDeleteByIdI = {
  deleteById(
    id: string
  )
    : Promise<boolean>
}
export type MongooseReadI<TPrimary> = {
  read(
    filter?: FilterQuery<TPrimary>,
    projection?: ProjectionType<any> | null | undefined,
    options?: QueryOptions<any> | null | undefined
  )
    : Promise<TPrimary[] | null>
}
export type MongooseUpdateI<TBase, TPrimary> = {
  update(
    filter?: FilterQuery<TPrimary> | undefined,
    update?: UpdateQuery<TBase> | undefined,
    options?: QueryOptions<TBase> | null | undefined
  )
    : Query<TPrimary[], any, {}, any, "find", {}>
}