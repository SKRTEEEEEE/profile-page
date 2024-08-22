import { ExtendedJWTPayload} from "@/core/infrastructure/adapters/thirdweb-auth";
import { VerifyLoginPayloadParams } from "thirdweb/auth";



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
    protAdmAct(): Promise<boolean>;
    //->Protected routes
    protLogRou(path:string): Promise<ExtendedJWTPayload>;
    protAdmRou(path:string): Promise<ExtendedJWTPayload>;
    
}