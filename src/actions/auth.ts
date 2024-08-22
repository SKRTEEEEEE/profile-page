"use server"

import { LoginUser } from "@/core/application/services/user-auth"
import { GeneratePayload, IsLoggedIn, Logout } from "@/core/application/usecases/auth"
import { MongooseUserRepository } from "@/core/infrastructure/repositories/mongoose-user-repository"
import { ThirdwebAuthRepository } from "@/core/infrastructure/repositories/thirdweb-auth-repository"
import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth"

const authRepository = new ThirdwebAuthRepository()

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
    const userRepository = new MongooseUserRepository()
    const doLogin = new LoginUser(authRepository,userRepository)
    return await doLogin.execute(payload)
}
