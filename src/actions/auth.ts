"use server"

import { apiLoginUserUC } from "@/core/application/usecases/entities/user"
// -> ❕🧠⚠️❗⬇️ SOLO PARA ACCIONES QUE SON LLAMADAS DESDE EL CLIENTE! - sino usar UC/C ⬇️❗⚠️🧠❕
//NOT CHECKED!

import { generatePayloadUC, getCookiesUC, isLoggedInUC, logoutUC, protAdmActUC, setJwtUC } from "@/core/application/usecases/services/auth"
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
    // return await loginUserUCMongoose(payload)
    const res = await apiLoginUserUC({payload})
    if(!res || !res.success) throw new Error("Login failed")
    const jwt = await setJwtUC(
    payload,
    {
      role: res.data.role,
      nick: res.data.nick,
      id: res.data.id,
      img: res.data.img || undefined
    }
  );
  return jwt
    // return res.data
}

// merge-old

export async function protAdmAct(){
    return await protAdmActUC()
}

