import { MongooseDocument } from "../types";
import { MongooseDeleteByIdI, MongooseDeleteI, MongooseDeleteProps } from "../types/implementations";
import { MongooseBaseRepository } from "./base.repository";

export class MongooseDeleteByIdRepository<
TBase,
> extends MongooseBaseRepository<TBase> implements MongooseDeleteByIdI{
  async deleteById(id: string): Promise<boolean> {
    await this.connect();
    const result: TBase & MongooseDocument|null = await this.Model.findByIdAndDelete(id);
    return !!result;
  }
}
export class MongooseDeleteRepository<
TBase,
> extends MongooseBaseRepository<TBase> implements MongooseDeleteI<TBase>{
  async delete({filter, options}: MongooseDeleteProps<TBase>) {
    await this.connect();
    return await this.Model.findOneAndDelete(filter, options)
  }
}
