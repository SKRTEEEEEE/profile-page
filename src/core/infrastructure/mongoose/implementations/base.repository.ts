import { Model, QueryOptions } from "mongoose";
import { MongoDbConnection } from "../../connectors/mongo-db";
import { MongooseBase, MongooseDocument } from "../types";


// Esta parte ya esta bien que utilize los tipos de mongoose?


export abstract class MongooseBaseRepository<
  TBase,
  TOptions extends Partial<Record<keyof TBase & MongooseBase, (value: any) => any>> = {}
> extends MongoDbConnection {
  constructor(protected Model: Model<any, {}, {}, {}, any, any>, private parseOpt?: TOptions) {
    super();
  }

//   protected documentToPrimary(document: TBase & MongooseDocument): TBase & MongooseBase {
//     const { _id, createdAt, updatedAt, ...rest } = document.toObject();
  
//     const result: Partial<TBase & MongooseBase> = {
//       id: _id.toString(),
//       createdAt: createdAt.toISOString(),
//       updatedAt: updatedAt.toISOString(),
//       ...rest,
//     };
  
//     // Aplicar las transformaciones especificadas en las opciones
//  if (this.parseOpt) {
//   Object.entries(this.parseOpt).forEach(([key, transformFn]) => {
//     if (key in result && typeof transformFn === 'function') {
//       result[key as keyof TBase & MongooseBase] = transformFn(result[key as keyof TBase & MongooseBase]);
//     }
//   });
// }

//     return result as TBase & MongooseBase;
//   }
 protected documentToPrimary(document: TBase & MongooseDocument): TBase & MongooseBase {
    const { _id, createdAt, updatedAt, ...rest } = document.toObject();

    const result: Partial<TBase & MongooseBase> = {
      id: _id.toString(),
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      ...rest,
    };

    // Aplicar las transformaciones especificadas en las opciones
    if (this.parseOpt) {
      Object.entries(this.parseOpt).forEach(([key, transformFn]) => {
        if (key in result && typeof transformFn === "function") {
          result[key as keyof TBase & MongooseBase] = transformFn(result[key as keyof TBase & MongooseBase]);
        }
      });
    }

    return result as TBase & MongooseBase;
  }
}