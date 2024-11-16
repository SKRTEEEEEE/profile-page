// infrastructure/repositories/thirdweb-auth-repository.ts


import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams, VerifyLoginPayloadResult } from "thirdweb/auth";
import { ThirdwebAuthAdapter } from "../connectors/thirdweb-auth";
import { AuthRepository, ExtendedJWTPayload, JWTContext } from "@/core/application/interfaces/services/auth";
import { VerificationOperationError } from "@/core/domain/errors/main";
import { RoleType } from "@/core/domain/entities/Role";
//Para hacer-lo bien estas funciones no se deberian usar aquí⚠️🧠👨‍🎓!
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

class ThirdwebAuthRepository extends ThirdwebAuthAdapter implements AuthRepository {
  async logout(): Promise<void> {
    cookies().delete("jwt");
  }

  async setJwt(payload: VerifyLoginPayloadParams, context: JWTContext): Promise<ExtendedJWTPayload> {
    const verifiedPayload = await this.thirdwebAuth.verifyPayload(payload);
    if (!verifiedPayload.valid)throw new VerificationOperationError("login payload") 
        const jwt = await this.thirdwebAuth.generateJWT({
            payload: verifiedPayload.payload,
            context
          });
          cookies().set("jwt", jwt);
          const authRes = await this.thirdwebAuth.verifyJWT({jwt});
        if(!authRes.valid)throw new VerificationOperationError("jwt login token")
        return authRes.parsedJWT as ExtendedJWTPayload
    
  }
  async generatePayload(params: GenerateLoginPayloadParams): Promise<LoginPayload>  {
    return this.thirdwebAuth.generatePayload(params)
  }
  async verifyPayload(params: VerifyLoginPayloadParams): Promise<VerifyLoginPayloadResult> {
    return this.thirdwebAuth.verifyPayload(params)
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
  
  //Hay que revisar estas funciones!!⚠️⚠️
  async isAdmin(): Promise<boolean> {
    const cookies = await this.getCookies();
    return cookies !== false && cookies.ctx?.role === RoleType["ADMIN"];
  }
  async protAdmAct(): Promise<true> {
    const isAdmin = await this.isAdmin();
    if (!isAdmin) throw new VerificationOperationError("Must be admin")
    return isAdmin
    
  }
  //Esta función limitara a que el usuario sea el mismo que el que ha iniciado sesión
  async protLogAct(): Promise<ExtendedJWTPayload> {
    const cookies = await this.getCookies()
    if (!cookies) throw new VerificationOperationError("Must log in")
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
}
export const authRepository = new ThirdwebAuthRepository()