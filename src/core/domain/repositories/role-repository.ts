// src/core/domain/repositories/RoleRepository.ts

import { Role, RoleType} from '../entities/Role';

export interface RoleRepository {
  create(role: Role): Promise<Role>;
  findById(id: string): Promise<Role | null>;
  update(id:string, permissions: RoleType): Promise<Role>;
  delete(id: string): Promise<void>;
}