// src/core/domain/repositories/UserRepository.ts

import { User, UserBase } from "@/core/domain/entities/User";
import { MongooseBaseRepository } from "./mongoose";


export type UserRepository = MongooseBaseRepository<UserBase, User> & {
  findByAddress(address:string): Promise<User|null>;
  deleteRoleId(id:string): Promise<void>;
}
