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

  async execute(user: UserBase): Promise<User> {
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
    async execute(id:string, address:string, isAdmin: boolean, solicitudAdmin: boolean, nick?:string): Promise<User> {
        if(!nick){return await this.userRepository.update(id,address, isAdmin, solicitudAdmin)}else{return await this.userRepository.update(id,address, isAdmin, solicitudAdmin, nick)}
        
    }
}
export class DeleteUserRoleId {
    constructor(private userRepository:UserRepository){}
    async execute(id:string){
        return await this.userRepository.deleteRoleId(id)
    }
}