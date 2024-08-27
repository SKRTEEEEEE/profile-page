// application/services/user-auth.ts

import { AuthRepository } from "@/core/domain/repositories/auth-repository";
import { UserRepository } from "@/core/domain/repositories/user-repository";
import { ExtendedJWTPayload } from "@/types/auth";
import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { User, UserBase } from "@/core/domain/entities/User";



export class LoginUser {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository
  ) { }

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
export class UpdateUser {
  constructor(
    private userRepository: UserRepository, private authRepository: AuthRepository
  ) { }
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
export class UserInCookies {
  constructor(private userRepository: UserRepository, private authRepository: AuthRepository){}
  async execute(): Promise<User|false>{
    const cooki = await this.authRepository.getCookies()
    if(!cooki) return false
    const user = await this.userRepository.findByAddress(cooki.sub)
    if(!user) return false
    return user
  }
}
