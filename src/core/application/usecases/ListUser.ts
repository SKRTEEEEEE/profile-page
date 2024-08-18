import { User } from "@/core/domain/entities/User";
import { UserRepository } from "@/core/domain/repositories/UserResository";

export class ListUser {
    constructor(private userRepository:UserRepository){}
    async execute(id: string): Promise<User|null> {
        return await this.userRepository.findById(id)
    }
}