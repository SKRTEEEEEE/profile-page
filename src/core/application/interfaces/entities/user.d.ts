// src/core/domain/repositories/UserRepository.ts

import { User, UserBase } from "@/core/domain/entities/User";
import { MongooseBaseI, MongooseDeleteI, MongooseReadI, MongooseUpdateI } from "@/core/infrastructure/types/mongoose";



export type UserRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
> = MongooseBaseI<TBase, TPrimary> & MongooseDeleteI & MongooseUpdateI<TBase, TPrimary> & MongooseReadI<TPrimary>