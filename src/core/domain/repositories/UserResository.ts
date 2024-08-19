// src/core/domain/repositories/UserRepository.ts

import { User } from '../entities/User';

export interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  update(id:string, name:string): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]|null>
}