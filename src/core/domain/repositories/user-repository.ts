// src/core/domain/repositories/UserRepository.ts

import { User, UserBase } from '../entities/User';

export interface UserRepository {
  create(user: Omit<UserBase, 'id'>): Promise<User>;
  findById(id: string): Promise<User | null>;
  update(user: UserBase): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]|null>;
  deleteRoleId(id:string): Promise<void>;
}