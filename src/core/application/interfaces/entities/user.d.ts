// src/core/domain/repositories/UserRepository.ts

import { User, UserBase } from "@/core/domain/entities/User";
import { MongooseBase, MongooseDocument } from "@/core/infrastructure/mongoose/types";
import { MongooseBaseI, MongooseCRUI, MongooseDeleteByIdI, MongooseReadI, MongooseUpdateI } from "@/core/infrastructure/mongoose/types/implementations";



export type UserRepository<
TBase
>=MongooseCRUI<TBase> & MongooseDeleteByIdI & MongooseUpdateI<TBase> & MongooseReadI<TBase>;