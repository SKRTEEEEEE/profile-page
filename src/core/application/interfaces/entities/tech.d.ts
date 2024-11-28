import { Fw, Leng, Lib } from "@/core/domain/entities/Tech";
import { MongooseBaseI, MongooseCRUI, MongooseDeleteI, MongooseReadI, MongooseUpdateI } from "@/core/infrastructure/mongoose/types/implementations";
import {  MongooseCRRUUD2 } from "@/core/infrastructure/mongoose/types/patterns";


export type LengRepository<TBase>=MongooseCRRUUD2<TBase>