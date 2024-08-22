import { AuthRepository } from "@/core/domain/repositories/auth-repository";
import { ExtendedJWTPayload } from "@/types/auth";
import { GenerateLoginPayloadParams, LoginPayload } from "thirdweb/auth";

export class UseAuth {
    constructor(private authRepository: AuthRepository){}
    async logout(): Promise<void> {
        this.authRepository.logout()
    }
    async getCookies(): Promise<ExtendedJWTPayload|false>{
        return this.authRepository.getCookies()
    }
    async isLoggedIn(): Promise<boolean>{
        return this.authRepository.isLoggedIn()
    }
    async isAdmin(): Promise<boolean>{
        return this.authRepository.isAdmin()
    }
    async protAdmAct(): Promise<true>{
        return this.authRepository.protAdmAct()
    }
    async protLogRou(path:string): Promise<ExtendedJWTPayload>{
        return this.authRepository.protLogRou(path)
    }
    async protAdmRou(path:string): Promise<ExtendedJWTPayload>{
        return this.authRepository.protAdmRou(path)
    }
    async generatePayload(address:GenerateLoginPayloadParams): Promise<LoginPayload> {
        return this.authRepository.generatePayload(address)
    }
}