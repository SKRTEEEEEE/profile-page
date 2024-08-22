// application/services/user-auth.ts

import { AuthRepository } from "@/core/domain/repositories/auth-repository";
import { UserRepository } from "@/core/domain/repositories/user-repository";
import {  ThirdwebAuthAdapter } from "@/core/infrastructure/adapters/thirdweb-auth-adapter";
import { ExtendedJWTPayload } from "@/types/auth";
import { VerifyLoginPayloadParams } from "thirdweb/auth";

export class LoginUser extends ThirdwebAuthAdapter {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository
  ) {super()}

  async execute(payload: VerifyLoginPayloadParams): Promise<ExtendedJWTPayload | null> {
    const verifiedPayload = await this.verifyPayload(payload);
    if (verifiedPayload.valid) {
      let user = await this.userRepository.findByAddress(verifiedPayload.payload.address);
      if (!user) {
        user = await this.userRepository.create({address: verifiedPayload.payload.address,roleId: null, isAdmin: false, solicitudAdmin: false})
      }

      const jwt = await this.authRepository.login(
        payload,
        {
          isAdmin: user.isAdmin,
          // Puedes agregar más datos al contexto si es necesario
        }
      );

      if (jwt) {
        const authRes = await this.verifyJWT({jwt});
        if(!authRes.valid)throw new Error("Error at verify Token")
        return authRes.parsedJWT as ExtendedJWTPayload
      }
    }
    return null;
  }
}