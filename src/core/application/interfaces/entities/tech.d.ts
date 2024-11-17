import { Fw, Leng, Lib } from "@/core/domain/entities/Tech";
import { MongooseBaseI, MongooseBaseRepository, MongooseReadI } from "@/core/infrastructure/types/mongoose";
import { Model } from "mongoose";

// export type LibRepository = MongooseBaseRepository<TechBase,Lib>
// export type FwRepository = MongooseBaseRepository<TechBase,Fw>
// export type LengRepository = MongooseBaseRepository<TechBase,Leng>&{
//     getLengModel():  Model<any, {}, {}, {}, any, any>
// }

export type LengRepository <
TBase,
TPrimary extends TBase & MongooseBase,
> = MongooseBaseI<TBase, TPrimary> & MongooseReadI<TPrimary>