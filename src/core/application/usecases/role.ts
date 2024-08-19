import { Role } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/RoleRepository";


export class CreateRole {
  constructor(private roleRepository: RoleRepository) {}

  async execute(rol: Role): Promise<Role> {
    const createdRole = await this.roleRepository.create(rol)
    return createdRole;
  }
}
export class DeleteRole {
    constructor(private roleRepository: RoleRepository) {}
  
    async execute(id: string): Promise<void> {
      await this.roleRepository.delete(id)
      
    }
  }
export class ListRole {
constructor(private roleRepository: RoleRepository) {}

async execute(id: string): Promise<Role|null> {
    const findedRole = await this.roleRepository.findById(id)
    return findedRole;
}
}
export class UpdateRole {
    constructor(private roleRepository: RoleRepository) {}
  
    async execute(role: Role): Promise<Role> {
      const updatedRole = await this.roleRepository.update(role)
      return updatedRole;
    }
  }