// infrastructure/repositories/thirdweb-auth-repository.ts


import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams, VerifyLoginPayloadResult } from "thirdweb/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ThirdwebAuthAdapter } from "../adapters/thirdweb-auth-adapter";
import { AuthRepository } from "@/core/domain/repositories/auth-repository";
import { ExtendedJWTPayload, JWTContext } from "@/types/auth";

class ThirdwebAuthRepository extends ThirdwebAuthAdapter implements AuthRepository {
  async logout(): Promise<void> {
    cookies().delete("jwt");
  }

  async setJwt(payload: VerifyLoginPayloadParams, context: JWTContext): Promise<ExtendedJWTPayload> {
    const verifiedPayload = await this.thirdwebAuth.verifyPayload(payload);
    if (!verifiedPayload.valid)throw new Error("Error at sign") 
        const jwt = await this.thirdwebAuth.generateJWT({
            payload: verifiedPayload.payload,
            context
          });
          cookies().set("jwt", jwt);
          const authRes = await this.thirdwebAuth.verifyJWT({jwt});
        if(!authRes.valid)throw new Error("Error at verify Token")
        return authRes.parsedJWT as ExtendedJWTPayload
    
  }

  async getCookies(): Promise<ExtendedJWTPayload | false> {
    const jwt = cookies().get("jwt");
    if (!jwt?.value) return false;
    const result = await this.thirdwebAuth.verifyJWT({ jwt: jwt.value });
    return result.valid ? result.parsedJWT as ExtendedJWTPayload : false;
  }

  async isLoggedIn(): Promise<boolean> {
    const cookies = await this.getCookies();
    return cookies !== false;
  }

  async isAdmin(): Promise<boolean> {
    const cookies = await this.getCookies();
    return cookies !== false && cookies.ctx?.isAdmin === true;
  }
  //Hay que revisar estas funciones!!⚠️⚠️
  async protAdmAct(): Promise<true> {
    const isAdmin = await this.isAdmin();
    if (!isAdmin) throw new Error("Must be admin")
    return isAdmin
    
  }
  //Esta función limitara a que el usuario sea el mismo que el que ha iniciado sesión
  async protLogAct(): Promise<ExtendedJWTPayload> {
    const cookies = await this.getCookies()
    if (!cookies) throw new Error("Must log in")
    return cookies
  }

  async protLogRou(path: string): Promise<ExtendedJWTPayload> {
    const cookies = await this.getCookies();
    if (cookies === false) redirect(path);
    return cookies;
  }

  async protAdmRou(path: string): Promise<ExtendedJWTPayload> {
    const cookies = await this.getCookies();
    if (cookies === false || cookies.ctx?.isAdmin !== true) redirect(path);
    return cookies;
  }
  async generatePayload(params: GenerateLoginPayloadParams): Promise<LoginPayload>  {
    return this.thirdwebAuth.generatePayload(params)
  }
  async verifyPayload(params: VerifyLoginPayloadParams): Promise<VerifyLoginPayloadResult> {
    return this.thirdwebAuth.verifyPayload(params)
  }
}
export const authRepository = new ThirdwebAuthRepository()