import { User } from "@/core/domain/entities/User";
import { UserRepository } from "@/core/domain/repositories/user-repository";

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
    async update(id: string, name:string,roleId?:string ): Promise<User> {
        if(!this.users)throw new Error("No users in memory");
        
        const user: User | undefined = this.users.find(u=>{
            return u.id === id
        })
        if(!user) throw new Error("Error at find user")
        const index = this.users.findIndex(user => user.id === id);
        const newUser = {
            id,
            name,
            roleId: roleId?roleId:user.roleId || null,
            createdAt: user.createdAt,
            updatedAt: Date.now().toString()
        }
        console.log("newUser: ",newUser)
        if (index !== -1) {
            this.users[index] = newUser;
            return newUser;
        }
        throw new Error(`User with id ${id} not found`);
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
    async deleteRoleId(id: string){
        const user = await this.findById(id)
        if(!user)throw new Error("User not found")
        user.roleId = null;
    }
}