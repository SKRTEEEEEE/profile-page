// infrastructure/repositories/thirdweb-auth-repository.ts


import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ExtendedJWTPayload, ThirdwebAuth } from "../adapters/thirdweb-auth";
import { AuthRepository } from "@/core/domain/repositories/auth-repository";

export class ThirdwebAuthRepository extends ThirdwebAuth implements AuthRepository {
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

  async protAdmAct(): Promise<boolean> {
    return await this.isAdmin();
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
}