import { AuthRepository } from "@/core/domain/repositories/auth-repository";
import { ExtendedJWTPayload } from "@/types/auth";
import { GenerateLoginPayloadParams, LoginPayload } from "thirdweb/auth";

export abstract class UseAuth {
    constructor(protected authRepository: AuthRepository){}
}
export class Logout extends UseAuth {
    async execute(): Promise<void> {
        this.authRepository.logout()
    }
}
export class GetCookies extends UseAuth {
    async execute(): Promise<ExtendedJWTPayload|false>{
        return this.authRepository.getCookies()
    }
}
export class IsLoggedIn extends UseAuth {
    async execute(): Promise<boolean>{
        return this.authRepository.isLoggedIn()
    }
}
export class IsAdmin extends UseAuth {
    async execute(): Promise<boolean>{
        return this.authRepository.isAdmin()
    }
}
export class ProtAdmAct extends UseAuth {
    async execute(): Promise<true>{
        return this.authRepository.protAdmAct()
    }
}
export class ProtLogRou extends UseAuth {
    async execute(path:string): Promise<ExtendedJWTPayload>{
        return this.authRepository.protLogRou(path)
    }
}
export class ProtAdmRou extends UseAuth {
    async execute(path:string): Promise<ExtendedJWTPayload>{
        return this.authRepository.protAdmRou(path)
    }
}
export class GeneratePayload extends UseAuth {
    async execute(address:GenerateLoginPayloadParams): Promise<LoginPayload> {
        return this.authRepository.generatePayload(address)
    }
}
