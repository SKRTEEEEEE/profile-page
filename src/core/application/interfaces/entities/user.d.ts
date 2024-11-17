// src/core/domain/repositories/UserRepository.ts

import { User, UserBase } from "@/core/domain/entities/User";
import { MongooseBaseRepository } from "./mongoose";
import { MongooseBaseI, MongooseDeleteI, MongooseReadI, MongooseUpdateI } from "@/core/infrastructure/types/mongoose";


// export type UserRepository = MongooseBaseRepository<UserBase, User> & {
//   findByAddress(address:string): Promise<User|null>;
//   deleteRoleId(id:string): Promise<void>;
// }
export type UserRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
> = MongooseBaseI<TBase, TPrimary> & MongooseDeleteI<TDocument> & MongooseUpdateI<TBase, TPrimary> & MongooseReadI<TPrimary>