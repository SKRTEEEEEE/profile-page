import { Role, RoleType } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/RoleRepository";

export class InMemoryRoleRepository implements RoleRepository {
  private roles: Role[] = [];

  async create(role: Role): Promise<Role> {
    this.roles.push(role);
    console.log("role: ", role)
    return role;
  }
  async findById(id:string) {
    const role = this.roles.find(role=> role.id===id)
    return role || null
  }
  async update(id:string, permissions: RoleType){
    if(!this.roles) throw new Error("No roles in memory")
    const role: Role | null = await this.findById(id)
    if(!role) throw new Error("Error at find role")
    const newRole = {
        id,
        name: role.name,
        permissions,
        createdAt: role.createdAt,
        updatedAt: Date.now().toString()
    }
    const index = this.roles.findIndex(user=>user.id===id)
    if(index!==-1){
        this.roles[index] = newRole;
        return newRole;
    }
    throw new Error(`Role with id ${id} not found`)
  }
  async delete(id:string ): Promise<void>{
    const index = this.roles.findIndex(role=>role.id===id)
    if (index !== -1) {
        this.roles.splice(index, 1);
    } else {
        throw new Error(`Role with id ${id} not found`);
    }
  }


}