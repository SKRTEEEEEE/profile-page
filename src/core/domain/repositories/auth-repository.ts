import { ExtendedJWTPayload } from "@/types/auth";
import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams, VerifyLoginPayloadResult } from "thirdweb/auth";
import { RoleType } from "../entities/Role";



export type AuthRepository = {
    
    logout(): Promise<void>;
    setJwt(payload: VerifyLoginPayloadParams, context: { role: RoleType| null, [key: string]: any }): Promise<ExtendedJWTPayload>;
    getCookies(): Promise<ExtendedJWTPayload|false>;
    //->Comprobaciones
    isLoggedIn(): Promise<boolean>;
    isAdmin(): Promise<boolean>;
    //->Protected actions
    //Protected "logged" action, w. redirect
    // protLogAct(path:string|false): Promise<void>
    //Protected "admin" action, wo. redirect
    protAdmAct(): Promise<true>;
    protLogAct(): Promise<ExtendedJWTPayload>;
    //->Protected routes
    protLogRou(path:string): Promise<ExtendedJWTPayload>;
    protAdmRou(path:string): Promise<ExtendedJWTPayload>;
    generatePayload(params: GenerateLoginPayloadParams): Promise<LoginPayload> 
    verifyPayload(params: VerifyLoginPayloadParams): Promise<VerifyLoginPayloadResult> 
    
}
// export type AuthAdapterRepository = {
//     generatePayload(params: GenerateLoginPayloadParams): Promise<LoginPayload> 

//     // verifyPayload(params: VerifyLoginPayloadParams): Promise<VerifyLoginPayloadResult> 
        

//     // generateJWT(payload: GenerateJWTParams): Promise<GenerateJWTReturnType> 
        

//     // verifyJWT(token: VerifyJWTParamsType): Promise<VerifyJWTReturnType> 
// }