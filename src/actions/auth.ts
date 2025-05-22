"use server"

// -> ❕🧠⚠️❗⬇️ SOLO PARA ACCIONES QUE SON LLAMADAS DESDE EL CLIENTE! - sino usar UC/C ⬇️❗⚠️🧠❕
//NOT CHECKED!

import { generatePayloadUC, getCookiesUC, isLoggedInUC, logoutUC, protAdmActUC } from "@/core/application/usecases/services/auth"
import { loginUserUCMongoose } from "@/core/presentation/controllers/user"
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
    return await loginUserUCMongoose(payload)
}

// merge-old

export async function protAdmAct(){
    return await protAdmActUC()
}

