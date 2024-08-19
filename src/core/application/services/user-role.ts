import { Role, RoleType } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/RoleRepository";
import { UserRepository } from "@/core/domain/repositories/UserResository";

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
}