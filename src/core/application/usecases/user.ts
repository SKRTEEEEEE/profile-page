import { User } from "@/core/domain/entities/User";
import { UserRepository } from "@/core/domain/repositories/UserResository";

// export class CreateUser {
//     constructor(private userRepository: UserRepository){}

//     async execute(userData: Omit<User, "id">): Promise<User>{
//         const user = new User(
//             Date.now().toString()+userData.name, // Simplificado para el ejemplo
//             userData.name,
//             userData.roleId,
//             Date.now().toString(),
//             Date.now().toString(),
//         )
//         return this.userRepository.create(user);

//     }
// }
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }
}
export class DeleteUser {
    constructor(private userRepository:UserRepository){}
    async execute(id:string): Promise<void> {
        return await this.userRepository.delete(id)
    }
}
export class ListUser {
    constructor(private userRepository:UserRepository){}
    async execute(id: string): Promise<User|null> {
        return await this.userRepository.findById(id)
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