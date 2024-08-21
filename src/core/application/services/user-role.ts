import { Role, RoleType } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/role-repository";
import { UserRepository } from "@/core/domain/repositories/user-repository";

export class UserRoleService {
    constructor(private userRepository: UserRepository,private roleRepository: RoleRepository){}
    async assignRoleToUser(userId:string,rolePermission:RoleType){
        const user = await this.userRepository.findById(userId)
        if(!user)throw new Error("User not found")
        const newRole = new Role(Date.now().toString()+user.name, user.name,rolePermission,Date.now().toString(),Date.now().toString())
        const createdRole = await this.roleRepository.create(newRole)
        console.log("createdRole: ", createdRole)
        await this.userRepository.update(userId,user.name,createdRole.id)
    }
    async deleteRole(idRole: string, idUser: string): Promise<void> {
        await this.roleRepository.delete(idRole)
        await this.userRepository.deleteRoleId(idUser)
        
    }
    async deleteUser(id:string): Promise<void> {
        const user = await this.userRepository.findById(id)
        if(!user)throw new Error("User not found")
        if (user.roleId!==null){
            await this.roleRepository.delete(user.roleId)
        }
        return await this.userRepository.delete(id)
        
    }

}
