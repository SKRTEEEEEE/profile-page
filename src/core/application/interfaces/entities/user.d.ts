// src/core/domain/repositories/UserRepository.ts

import { User, UserBase } from "@/core/domain/entities/User";
import { MongooseBase, MongooseDocument } from "@/core/infrastructure/mongoose/types";
import { MongooseBaseI, MongooseCRUI, MongooseDeleteByIdI, MongooseReadI, MongooseUpdateI } from "@/core/infrastructure/mongoose/types/implementations";
import { MongooseCRRUUD1 } from "@/core/infrastructure/mongoose/types/patterns";



export type UserRepository<
TBase
>=MongooseCRRUUD1<TBase>