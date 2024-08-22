import { ExtendedJWTPayload } from "@/types/auth";
import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";



export type AuthRepository = {
    
    logout(): Promise<void>;
    login(payload: VerifyLoginPayloadParams, context: { isAdmin: boolean, [key: string]: any }): Promise<string | null>;
    getCookies(): Promise<ExtendedJWTPayload|false>;
    //->Comprobaciones
    isLoggedIn(): Promise<boolean>;
    isAdmin(): Promise<boolean>;
    //->Protected actions
    //Protected "logged" action, w. redirect
    // protLogAct(path:string|false): Promise<void>
    //Protected "admin" action, wo. redirect
    protAdmAct(): Promise<true>;
    //->Protected routes
    protLogRou(path:string): Promise<ExtendedJWTPayload>;
    protAdmRou(path:string): Promise<ExtendedJWTPayload>;
    generatePayload(params: GenerateLoginPayloadParams): Promise<LoginPayload> 

    
}
// export type AuthAdapterRepository = {
//     generatePayload(params: GenerateLoginPayloadParams): Promise<LoginPayload> 

//     // verifyPayload(params: VerifyLoginPayloadParams): Promise<VerifyLoginPayloadResult> 
        

//     // generateJWT(payload: GenerateJWTParams): Promise<GenerateJWTReturnType> 
        

//     // verifyJWT(token: VerifyJWTParamsType): Promise<VerifyJWTReturnType> 
// }