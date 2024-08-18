import { Role } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/RoleRepository";


export class UpdateRole {
  constructor(private roleRepository: RoleRepository) {}

  async execute(role: Role): Promise<Role> {
    const updatedRole = await this.roleRepository.update(role)
    return updatedRole;
  }
}