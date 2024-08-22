// src/core/domain/repositories/RoleRepository.ts

import { Role, RoleBase, RoleType} from '../entities/Role';

export type RoleRepository = {
  create(role: Omit<RoleBase, 'id'>): Promise<Role>;
  findById(id: string): Promise<Role | null>;
  update(id:string, permissions: RoleType): Promise<Role>;
  delete(id: string): Promise<void>;
}