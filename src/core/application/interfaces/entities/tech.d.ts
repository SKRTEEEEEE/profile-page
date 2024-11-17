import { Fw, Leng, Lib } from "@/core/domain/entities/Tech";
import { MongooseBaseI, MongooseReadI } from "@/core/infrastructure/mongoose/types/implementations";
import { Model } from "mongoose";


export type LengRepository <
TBase,
TPrimary extends TBase & MongooseBase,
> = MongooseBaseI<TBase, TPrimary> & MongooseReadI<TPrimary>