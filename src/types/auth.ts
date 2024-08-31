import { RoleType } from "@/core/domain/entities/Role";
import { createAuth, VerifyLoginPayloadResult } from "thirdweb/auth";
import { JWTPayload } from "thirdweb/utils";


// Define el tipo completo de ThirdwebAuth
type ThirdwebAuthType = ReturnType<typeof createAuth>;

// Extraer los tipos de las funciones individuales dentro de ThirdwebAuthType
// type GeneratePayloadType = ThirdwebAuthType['generatePayload'];
// type VerifyPayloadType = ThirdwebAuthType['verifyPayload'];
type GenerateJWTType = ThirdwebAuthType['generateJWT'];
type VerifyJWTType = ThirdwebAuthType['verifyJWT'];

// Ejemplos de uso de los tipos extraídos
// type GeneratePayloadParams = Parameters<GeneratePayloadType>[0];
// type VerifyPayloadParamsType = Parameters<VerifyPayloadType>[0];
export type GenerateJWTParams = Parameters<GenerateJWTType>[0];
export type VerifyJWTParamsType = Parameters<VerifyJWTType>[0];

type ValidVerifyLoginPayload = Extract<VerifyLoginPayloadResult, {valid: true}>
export type VerifiedLoginPayload = ValidVerifyLoginPayload["payload"]

// type GeneratePayloadReturnType = ReturnType<GeneratePayloadType>;
// type VerifyPayloadReturnType = ReturnType<VerifyPayloadType>;
export type GenerateJWTReturnType = Awaited<ReturnType<GenerateJWTType>>;
export type VerifyJWTReturnType = Awaited<ReturnType<VerifyJWTType>>;

// type ValidJWTReturnType = Extract<VerifyJWTReturnType, { valid: true }>;
// export type JWTPayload = ValidJWTReturnType['parsedJWT'];

export type JWTContext = {
    role?: RoleType;
    nick?: string;
    id: string;
    [key: string]: any;
  }
export interface ExtendedJWTPayload extends JWTPayload{
    ctx: JWTContext
}
