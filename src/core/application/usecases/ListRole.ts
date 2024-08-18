import { Role } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/RoleRepository";


export class ListRole {
  constructor(private roleRepository: RoleRepository) {}

  async execute(id: string): Promise<Role|null> {
    const findedRole = await this.roleRepository.findById(id)
    return findedRole;
  }
}