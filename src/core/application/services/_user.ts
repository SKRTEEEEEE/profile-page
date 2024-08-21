// src/core/application/services/userService.ts

import { UserRepository } from "@/core/domain/repositories/user-repository";
import { CreateUser, DeleteUser, ListUsers, UpdateUser } from "../usecases/user";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: { name: string }) {
    const createUser = new CreateUser(this.userRepository);
    return createUser.execute({
      id: Date.now().toString() + userData.name,
      name: userData.name,
      roleId: null,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    });
  }

  // Otros métodos...
}