import { User } from "@/core/domain/entities/User";
import { UserRepository } from "@/core/domain/repositories/UserResository";

export class UpdateUser {
    constructor(private userRepository:UserRepository){}
    async execute(user:User): Promise<User> {
        return await this.userRepository.update(user)
    }
}