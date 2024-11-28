import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import { AuthRepository, ExtendedJWTPayload, JWTContext } from "../../interfaces/services/auth";
import { authRepository } from "@/core/infrastructure/services/thirdweb-auth";

abstract class UseAuth {
    constructor(protected authRepository: AuthRepository){}
}
class Logout extends UseAuth {
    async execute(): Promise<void> {
        this.authRepository.logout()
    }
}
export const logoutUC = async () => {
    const l = new Logout(authRepository)
    await l.execute()
}
class GetCookies extends UseAuth {
    async execute(): Promise<ExtendedJWTPayload|false>{
        return this.authRepository.getCookies()
    }
}
export const getCookiesUC = async () => {
    const g = new GetCookies(authRepository)
    return g.execute()
}
class IsLoggedIn extends UseAuth {
    async execute(): Promise<boolean>{
        return this.authRepository.isLoggedIn()
    }
}
export const isLoggedInUC = async (): Promise<boolean> => {
    const i = new IsLoggedIn(authRepository)
    return await i.execute()
} 
// export class IsAdmin extends UseAuth {
//     async execute(): Promise<boolean>{
//         return this.authRepository.isAdmin()
//     }
// }
class ProtAdmAct extends UseAuth {
    async execute(): Promise<true>{
        return this.authRepository.protAdmAct()
    }
}
export const protAdmActUC = async () => {
    const p = new ProtAdmAct(authRepository)
    return p.execute()
}
// export class ProtLogAct extends UseAuth {
//     async execute(): Promise<ExtendedJWTPayload> {
//         return this.authRepository.protLogAct()
//     }
// }
// export class ProtLogRou extends UseAuth {
//     async execute(path:string): Promise<ExtendedJWTPayload>{
//         return this.authRepository.protLogRou(path)
//     }
// }
// export class ProtAdmRou extends UseAuth {
//     async execute(path:string): Promise<ExtendedJWTPayload>{
//         return this.authRepository.protAdmRou(path)
//     }
// }
class GeneratePayload extends UseAuth {
    async execute(address:GenerateLoginPayloadParams): Promise<LoginPayload> {
        return this.authRepository.generatePayload(address)
    }
}
export const generatePayloadUC = async (payload: GenerateLoginPayloadParams): Promise<LoginPayload> => {
    const g = new GeneratePayload(authRepository)
    return await g.execute(payload)
}
// export class VerifyPayload extends UseAuth {
//     async execute(params: VerifyLoginPayloadParams): Promise<VerifyLoginPayloadResult>{
//         return this.authRepository.verifyPayload(params)
//     }
// }
class SetJwt extends UseAuth {
    async execute(payload: VerifyLoginPayloadParams, context:JWTContext): Promise<ExtendedJWTPayload>{
        return await this.authRepository.setJwt(payload, context)
    }
}
export const setJwtUC = async (payload: VerifyLoginPayloadParams, context:JWTContext)=> {
    const s = new SetJwt(authRepository)
    return await s.execute(payload,context)
}

export const verifyPayloadUC = async(params: VerifyLoginPayloadParams)=>{
    return await authRepository.verifyPayload(params)
}