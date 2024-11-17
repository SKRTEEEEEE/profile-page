import { Fw, Leng, Lib } from "@/core/domain/entities/Tech";
import { MongooseBaseI, MongooseCRUI, MongooseReadI } from "@/core/infrastructure/mongoose/types/implementations";


export type LengRepository <
TBase,
> = MongooseCRUI<TBase> & MongooseReadI<TBase>