import { AuthRepository } from "@/core/domain/repositories/auth-repository";
import { ExtendedJWTPayload } from "@/core/infrastructure/adapters/thirdweb-auth-adapter";

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
    async protAdmAct(): Promise<boolean>{
        return this.authRepository.protAdmAct()
    }
    async protLogRou(path:string): Promise<ExtendedJWTPayload>{
        return this.authRepository.protLogRou(path)
    }
    async protAdmRou(path:string): Promise<ExtendedJWTPayload>{
        return this.authRepository.protAdmRou(path)
    }
}