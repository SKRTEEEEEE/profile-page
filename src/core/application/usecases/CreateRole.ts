import { Role } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/RoleRepository";


export class CreateRole {
  constructor(private roleRepository: RoleRepository) {}

  async execute(rol: Role): Promise<Role> {
    const createdRole = await this.roleRepository.create(rol)
    return createdRole;
  }
}
