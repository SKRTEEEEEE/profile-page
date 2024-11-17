// src/core/domain/repositories/UserRepository.ts

import { User, UserBase } from "@/core/domain/entities/User";
import { MongooseBase, MongooseDocument } from "@/core/infrastructure/mongoose/types";
import { MongooseBaseI, MongooseDeleteByIdI, MongooseReadI, MongooseUpdateI } from "@/core/infrastructure/mongoose/types/implementations";



export type UserRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument
>=MongooseBaseI<TBase, TPrimary> & MongooseDeleteByIdI & MongooseUpdateI<TBase, TPrimary> & MongooseReadI<TPrimary>;