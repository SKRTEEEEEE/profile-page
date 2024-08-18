import { User } from "@/core/domain/entities/User";
import { UserRepository } from "@/core/domain/repositories/UserResository";

export class LocalStorageUserRepository implements UserRepository {
    private readonly storageKey = 'users';
    
    async create(user: User): Promise<User> {
      const users = await this.findAll();
      users.push(user);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      return user;
    }
  
    async findById(id: string): Promise<User | null> {
      const users = await this.findAll();
      return users.find(user => user.id === id) || null;
    }
  
    async update(user: User): Promise<User> {
      const users = await this.findAll();
      const index = users.findIndex(u => u.id === user.id);
      if (index === -1) throw new Error('User not found');
      users[index] = user;
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      return user;
    }
  
    async delete(id: string): Promise<void> {
      const users = await this.findAll();
      const updatedUsers = users.filter(user => user.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(updatedUsers));
    }
  
    private async findAll(): Promise<User[]> {
      const usersJson = localStorage.getItem(this.storageKey);
      return usersJson ? JSON.parse(usersJson) : [];
    }
  

  }