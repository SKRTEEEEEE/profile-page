import { UserRepository } from "@/core/domain/repositories/UserResository";

export class DeleteUser {
    constructor(private userRepository:UserRepository){}
    async execute(id:string): Promise<void> {
        return await this.userRepository.delete(id)
    }
}