// application/services/user-auth.ts

import { AuthRepository } from "@/core/domain/repositories/auth-repository";
import { UserRepository } from "@/core/domain/repositories/user-repository";
import { ExtendedJWTPayload } from "@/types/auth";
import { LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import { User, UserBase } from "@/core/domain/entities/User";
import { RoleType } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/role-repository";

// user-auth service

abstract class UseUserAuthService {
  constructor(protected userRepository: UserRepository, protected authRepository: AuthRepository) { }
}
export class LoginUser extends UseUserAuthService{
  async execute(payload: VerifyLoginPayloadParams): Promise<ExtendedJWTPayload> {
    const verifiedPayload = await this.authRepository.verifyPayload(payload);
    if (!verifiedPayload.valid) throw new Error("Payload not valid")
    let user = await this.userRepository.findByAddress(verifiedPayload.payload.address);
    if (!user) {
      user = await this.userRepository.create({ address: verifiedPayload.payload.address, roleId: null, isAdmin: false, solicitudAdmin: false })
    }

    const jwt = await this.authRepository.setJwt(
      payload,
      {
        isAdmin: user.isAdmin,
        nick: user.nick,
        id: user.id
        // Puedes agregar más datos al contexto si es necesario
      }
    );

    return jwt

  }
}
//Aqui haremos el update de las cosas que puede hacer el usuario corriente, para dar admin a un usuario que loha solicitado se creara una nueva funcion limitada a los admin
export class UpdateUser extends UseUserAuthService {
  async execute(payload: VerifyLoginPayloadParams, user: Omit<UserBase, "roleId" | "isAdmin" | "address">): Promise<ExtendedJWTPayload | null> {

    const userB = await this.userRepository.findById(user.id)
    if (!userB) throw new Error("No user in bdd")

    // Actualiza el usuario
    const updatedUser = await this.userRepository.update({ ...user, address: userB.address, isAdmin: userB.isAdmin, roleId: userB.roleId })
    if (!updatedUser) throw new Error("Error at update user")


    const newJWT = await this.authRepository.setJwt(payload,
      {
        isAdmin: userB.isAdmin,
        nick: user.nick,
        id: user.id
        // Puedes agregar más datos al contexto si es necesario
      })



    return newJWT;

  }
}
export class UserInCookies extends UseUserAuthService {
  async execute(): Promise<User|false>{
    const cooki = await this.authRepository.getCookies()
    if(!cooki) return false
    const user = await this.userRepository.findByAddress(cooki.sub)
    if(!user) return false
    return user
  }
}

// user-role services

export class UserRoleService {
  constructor(private userRepository: UserRepository, private roleRepository: RoleRepository) { }
  async assignRoleToUser(userId: string, rolePermission: RoleType) {
      const user = await this.userRepository.findById(userId)
      if (!user) throw new Error("User not found")
      const newRole = { address: user.address, permissions: rolePermission }
      const createdRole = await this.roleRepository.create(newRole)
      console.log("createdRole: ", createdRole)
      await this.userRepository.update({ id:userId,address: user.address, roleId: createdRole.id, 
          isAdmin: user.isAdmin, solicitudAdmin: user.solicitudAdmin })
  }
  async deleteRole(idRole: string, idUser: string): Promise<void> {
      await this.roleRepository.delete(idRole)
      await this.userRepository.deleteRoleId(idUser)
  }
  // ⬇️🧠Traspasado a UserRoleAuthServices
  // async deleteUser(id: string): Promise<void> {
  //     const user = await this.userRepository.findById(id)
  //     if (!user) throw new Error("User not found")
  //     if (user.roleId !== null) {
  //         await this.roleRepository.delete(user.roleId)
  //     }
  //     return await this.userRepository.delete(id)
  // }
}

export class UserRoleAuthService{
  constructor(private userRepository: UserRepository, private roleRepository: RoleRepository, private authRepository: AuthRepository){}
  async deleteUserAccount(payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
},id:string, address: string){
  const v = await this.authRepository.verifyPayload(payload)
  if(!v.valid) throw new Error("Error with payload auth")
  if(v.payload.address!==address) throw new Error("User only can delete her address")

  //deleteUser(id)
  const user = await this.userRepository.findById(id)
  if (!user) throw new Error("User not found")
  if (user.roleId !== null) {
      await this.roleRepository.delete(user.roleId)
  }
  await this.userRepository.delete(id)
  await this.authRepository.logout()
}
}