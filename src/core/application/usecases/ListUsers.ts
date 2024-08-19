import { User } from "@/core/domain/entities/User";
import { UserRepository } from "@/core/domain/repositories/UserResository";

export class ListUsers {
    constructor(private userRepository:UserRepository){}
    async execute(): Promise<User[]|null> {
        return await this.userRepository.findAll()
    }
}