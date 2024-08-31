"use server"

import { LoginUser } from "@/core/application/usecases/compound/user"
import { GeneratePayload, IsLoggedIn, Logout } from "@/core/application/usecases/services/auth"
import { userRepository } from "@/core/infrastructure/repositories/mongoose-user-repository"
import { authRepository } from "@/core/infrastructure/repositories/thirdweb-auth-repository"
import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth"


export async function isLoggedIn(){
    const useAuth = new IsLoggedIn(authRepository)
    return await useAuth.execute()
}
export async function generatePayload(address: GenerateLoginPayloadParams): Promise<LoginPayload>{
    const useAuth = new GeneratePayload(authRepository)
    return await useAuth.execute(address)
}
export async function logout(){
    const useAuth = new Logout(authRepository)
    await useAuth.execute()
}
export async function login(payload: VerifyLoginPayloadParams){
    const doLogin = new LoginUser(userRepository,authRepository)
    return await doLogin.execute(payload)
}


