"use server"

import { generatePayloadUC, getCookiesUC, isLoggedInUC, logoutUC, protAdmActUC } from "@/core/application/usecases/services/auth"
import { loginUserUC } from "@/core/interface-adapters/controllers/user"
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

// merge-old
export async function getCookies(){
    return await getCookiesUC()
}
export async function protAdmAct(){
    return await protAdmActUC()
}

