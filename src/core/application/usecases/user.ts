import { User } from "@/core/domain/entities/User";
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

  async execute(user: User): Promise<User> {
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
    async execute(id:string, name:string): Promise<User> {
        return await this.userRepository.update(id,name)
    }
}
export class DeleteUserRoleId {
    constructor(private userRepository:UserRepository){}
    async execute(id:string){
        return await this.userRepository.deleteRoleId(id)
    }
}