import { RoleRepository } from "@/core/domain/repositories/RoleRepository";


export class DeleteRole {
  constructor(private roleRepository: RoleRepository) {}

  async execute(id: string): Promise<void> {
    await this.roleRepository.delete(id)
    
  }
}