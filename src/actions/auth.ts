"use server"

import { loginUserUC } from "@/core/application/usecases/compound/user"
import { generatePayloadUC, isLoggedInUC, logoutUC } from "@/core/application/usecases/services/auth"
import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth"


export async function isLoggedIn(){
    return await isLoggedInUC()
}
export async function generatePayload(address: GenerateLoginPayloadParams): Promise<LoginPayload>{
    return await generatePayloadUC(address)
}
export async function logout(){
    await logoutUC()
}
export async function login(payload: VerifyLoginPayloadParams){
    return await loginUserUC(payload)
}


