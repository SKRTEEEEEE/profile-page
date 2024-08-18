// src/core/domain/repositories/RoleRepository.ts

import { Role} from '../entities/Role';

export interface RoleRepository {
  create(role: Role): Promise<Role>;
  findById(id: string): Promise<Role | null>;
  update(role: Role): Promise<Role>;
  delete(id: string): Promise<void>;
}