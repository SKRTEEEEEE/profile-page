import { User } from "@/core/domain/entities/User";
import { UserRepository } from "@/core/domain/repositories/UserResository";

export class UpdateUser {
    constructor(private userRepository:UserRepository){}
    async execute(id:string, name:string): Promise<User> {
        return await this.userRepository.update(id,name)
    }
}