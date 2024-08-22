// infrastructure/repositories/thirdweb-auth-repository.ts


import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ThirdwebAuthAdapter } from "../adapters/thirdweb-auth-adapter";
import { AuthRepository } from "@/core/domain/repositories/auth-repository";
import { ExtendedJWTPayload } from "@/types/auth";

export class ThirdwebAuthRepository extends ThirdwebAuthAdapter implements AuthRepository {
  async logout(): Promise<void> {
    cookies().delete("jwt");
  }

  async login(payload: VerifyLoginPayloadParams, context: { isAdmin: boolean, [key: string]: any }): Promise<string | null> {
    const verifiedPayload = await this.verifyPayload(payload);
    if (verifiedPayload.valid) {
        const jwt = await this.generateJWT({
            payload: verifiedPayload.payload,
            context
          });
          cookies().set("jwt", jwt);
          return jwt;
    }
    return null;
  }

  async getCookies(): Promise<ExtendedJWTPayload | false> {
    const jwt = cookies().get("jwt");
    if (!jwt?.value) return false;
    const result = await this.verifyJWT({ jwt: jwt.value });
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
}