import { Fw, Leng, Lib } from "@/core/domain/entities/Tech";
import { MongooseBaseI, MongooseCRUI, MongooseDeleteI, MongooseReadI } from "@/core/infrastructure/mongoose/types/implementations";


export type LengRepository <
TBase,
> = MongooseCRUI<TBase> & MongooseReadI<TBase> & MongooseDeleteI