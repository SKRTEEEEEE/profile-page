// src/infrastructure/repositories/LocalStorageRoleRepository.ts

import { Role } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/RoleRepository";

export class LocalStorageRoleRepository implements RoleRepository {
  private readonly storageKey = 'roles';

  async create(role: Role): Promise<Role> {
    const roles = await this.findAll();
    roles.push(role);
    localStorage.setItem(this.storageKey, JSON.stringify(roles));
    return role;
  }

  async findById(id: string): Promise<Role | null> {
    const roles = await this.findAll();
    return roles.find(role => role.id === id) || null;
  }



  async update(role: Role): Promise<Role> {
    const roles = await this.findAll();
    const index = roles.findIndex(r => r.id === role.id);
    if (index === -1) throw new Error('Role not found');
    roles[index] = role;
    localStorage.setItem(this.storageKey, JSON.stringify(roles));
    return role;
  }

  async delete(id: string): Promise<void> {
    const roles = await this.findAll();
    const updatedRoles = roles.filter(role => role.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedRoles));
  }

   private async findAll(): Promise<Role[]> {
    const rolesJson = localStorage.getItem(this.storageKey);
    return rolesJson ? JSON.parse(rolesJson) : [];
  }
}
