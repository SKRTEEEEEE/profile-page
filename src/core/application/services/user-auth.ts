// application/services/user-auth.ts

import { AuthRepository } from "@/core/domain/repositories/auth-repository";
import { UserRepository } from "@/core/domain/repositories/user-repository";
import { ThirdwebAuthAdapter } from "@/core/infrastructure/adapters/thirdweb-auth-adapter";
import { ExtendedJWTPayload } from "@/types/auth";
import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { UserBase } from "@/core/domain/entities/User";
import { cookies } from "next/headers";


export class LoginUser extends ThirdwebAuthAdapter {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository
  ) {super()}

  async execute(payload: VerifyLoginPayloadParams): Promise<ExtendedJWTPayload | null> {
    const verifiedPayload = await this.thirdwebAuth.verifyPayload(payload);
    if (verifiedPayload.valid) {
      let user = await this.userRepository.findByAddress(verifiedPayload.payload.address);
      if (!user) {
        user = await this.userRepository.create({address: verifiedPayload.payload.address,roleId: null, isAdmin: false, solicitudAdmin: false})
      }

      const jwt = await this.authRepository.login(
        payload,
        {
          isAdmin: user.isAdmin,
          nick: user.nick,
          id: user.id
          // Puedes agregar más datos al contexto si es necesario
        }
      );

      if (jwt) {
        const authRes = await this.thirdwebAuth.verifyJWT({jwt});
        if(!authRes.valid)throw new Error("Error at verify Token")
        return authRes.parsedJWT as ExtendedJWTPayload
      }
    }
    return null;
  }
}
export class UpdateUser extends ThirdwebAuthAdapter{
  constructor(
    private userRepository: UserRepository
  ) {super()}
  async execute(payload: VerifyLoginPayloadParams, user:Omit<UserBase, "roleId"|"isAdmin"|"address">): Promise<ExtendedJWTPayload | null> {
    const verifiedPayload = await this.thirdwebAuth.verifyPayload(payload);
    if (verifiedPayload.valid){
      const userB = await this.userRepository.findById(user.id)
      if(!userB) throw new Error("No user in bdd")
  
   

    // Actualiza el usuario
    const updatedUser = await this.userRepository.update({...user, address: userB.address, isAdmin: userB.isAdmin, roleId:userB.roleId}) 
    if(!updatedUser)throw new Error("Error at update user")

  
    const newJWT =  await this.thirdwebAuth.generateJWT({ payload: verifiedPayload.payload,
      context: {
        isAdmin: userB.isAdmin,
        nick: user.nick,
        id: user.id
        // Puedes agregar más datos al contexto si es necesario
      }})
      if (newJWT) {
        const newAuthRes = await this.thirdwebAuth.verifyJWT({ jwt: newJWT });
        if (!newAuthRes.valid) throw new Error("Error verifying new token");
  
        // Actualiza la cookie con el nuevo JWT
        cookies().set("jwt", newJWT);
  
        return newAuthRes.parsedJWT as ExtendedJWTPayload;
      }
    }

      
  
    return null;
  }
}