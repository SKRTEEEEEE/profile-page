// src/core/domain/repositories/UserRepository.ts

import { User, UserBase } from "@/core/domain/entities/User";


export type UserRepository = {
  create(user: Omit<UserBase, 'id'|"isVerified">): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByAddress(address:string): Promise<User|null>;
  update(user: UserBase): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]|null>;
  deleteRoleId(id:string): Promise<void>;
}