import { User } from "@/core/domain/entities/User";
import { UserRepository } from "@/core/domain/repositories/UserResository";

export class InMemoryUserRepository implements UserRepository{
    constructor(
        private users: User[] = []
    ){}
    
    async create(user:User): Promise<User> {
        this.users.push(user)
        console.log("users: ",this.users)
        return user
    }
    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);
        return user || null;
    }
    async update(_user: User): Promise<User> {
        const index = this.users.findIndex(user => user.id === _user.id);
        if (index !== -1) {
            this.users[index] = _user;
            return _user;
        }
        throw new Error(`User with id ${_user.id} not found`);
    }
    async delete(id: string): Promise<void> {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        } else {
            throw new Error(`User with id ${id} not found`);
        }
    }

    async findAll(): Promise<User[] | null> {
        return this.users.length > 0 ? this.users : null;
    }
}