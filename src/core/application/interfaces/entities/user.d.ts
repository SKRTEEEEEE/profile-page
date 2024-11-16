// src/core/domain/repositories/UserRepository.ts

import { User, UserBase } from "@/core/domain/entities/User";
import { MongooseBaseRepository } from "./mongoose";


export type UserRepository = MongooseBaseRepository<UserBase, User> & {
  // findById(id: string): Promise<User | null>; readById
  // readById(id: string): Promise<User | null>; 
  findByAddress(address:string): Promise<User|null>;
  // updateById(id: string,user: Partial<UserBase>, options?: QueryOptions<any> & { includeResultMetadata: true; lean: true; }): Promise<User>;
  // update(user: Partial<User>): Promise<User>;
  // delete(id: string): Promise<void>;
  // delete(id: string): Promise<boolean>;
  findAll(): Promise<User[]|null>;
  deleteRoleId(id:string): Promise<void>;
}
// export type UserRepository = {
//   create(user: Omit<UserBase, 'id'|"isVerified">): Promise<User>;
//   findById(id: string): Promise<User | null>;
//   findByAddress(address:string): Promise<User|null>;
//   update(user: Partial<User>): Promise<User>;
//   delete(id: string): Promise<void>;
//   findAll(): Promise<User[]|null>;
//   deleteRoleId(id:string): Promise<void>;
// }