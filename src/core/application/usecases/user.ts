import { User, UserBase } from "@/core/domain/entities/User";
import { UserRepository } from "@/core/domain/repositories/user-repository";

export class ListUserById{
    constructor(private userRepository:UserRepository){}
    async execute(id:string){
        const user = await this.userRepository.findById(id)
        return user
    }
}
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(user: Omit<UserBase, 'id'>): Promise<User> {
    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }
}

export class ListUsers {
    constructor(private userRepository:UserRepository){}
    async execute(): Promise<User[]|null> {
        return await this.userRepository.findAll()
    }
}
export class UpdateUser {
    constructor(private userRepository:UserRepository){}
    async execute(user:Omit<UserBase, "roleId">): Promise<User> {
        const fUser = await this.userRepository.findById(user.id)
        if(!fUser)throw new Error("User not found at Update User use-case")
        return this.userRepository.update({...user, roleId:fUser.roleId}) 
    }
}
export class DeleteUserRoleId {
    constructor(private userRepository:UserRepository){}
    async execute(id:string){
        return await this.userRepository.deleteRoleId(id)
    }
}
export class FindUserByAddress {
    constructor(private userRepository:UserRepository){}
    async execute(address:string){
        return await this.userRepository.findByAddress(address)
    }
}