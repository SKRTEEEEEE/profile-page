"use server"

import { LoginUser } from "@/core/application/services/user-auth"
import { UseAuth } from "@/core/application/usecases/auth"
import { MongooseUserRepository } from "@/core/infrastructure/repositories/mongoose-user-repository"
import { ThirdwebAuthRepository } from "@/core/infrastructure/repositories/thirdweb-auth-repository"
import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth"

const authRepository = new ThirdwebAuthRepository()
const useAuth = new UseAuth(authRepository)

export async function isLoggedIn(){
    return await useAuth.isLoggedIn()
}
export async function generatePayload(address: GenerateLoginPayloadParams): Promise<LoginPayload>{
    return await useAuth.generatePayload(address)
}
export async function logout(){
    await useAuth.logout()
}
export async function login(payload: VerifyLoginPayloadParams){
    const userRepository = new MongooseUserRepository()
    const doLogin = new LoginUser(authRepository,userRepository)
    return await doLogin.execute(payload)
    
}