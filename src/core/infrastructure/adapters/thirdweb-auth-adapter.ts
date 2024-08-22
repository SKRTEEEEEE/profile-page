import { createAuth, GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams, VerifyLoginPayloadResult } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { createThirdwebClient, ThirdwebClient } from "thirdweb";
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
type GenerateJWTParams = Parameters<GenerateJWTType>[0];
type VerifyJWTParamsType = Parameters<VerifyJWTType>[0];

type ValidVerifyLoginPayload = Extract<VerifyLoginPayloadResult, {valid: true}>
export type VerifiedLoginPayload = ValidVerifyLoginPayload["payload"]

// type GeneratePayloadReturnType = ReturnType<GeneratePayloadType>;
// type VerifyPayloadReturnType = ReturnType<VerifyPayloadType>;
type GenerateJWTReturnType = Awaited<ReturnType<GenerateJWTType>>;
export type VerifyJWTReturnType = Awaited<ReturnType<VerifyJWTType>>;

// type ValidJWTReturnType = Extract<VerifyJWTReturnType, { valid: true }>;
// export type JWTPayload = ValidJWTReturnType['parsedJWT'];

export type JWTContext = {
    isAdmin: boolean;
    [key: string]: any;
  }
export interface ExtendedJWTPayload extends JWTPayload{
    ctx: JWTContext
}


class ThirdwebClientConfig {
    private clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
    protected _client: ThirdwebClient;
    constructor(){
        this._client = this.initialize()
    }
    private initialize() {
        if(!this.clientId) throw new Error("Client Id not found")
        return createThirdwebClient({clientId: this.clientId})
    }
    public get client (): ThirdwebClient {
        return this._client
    }
}

export abstract class ThirdwebAuthAdapter extends ThirdwebClientConfig {
    private privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY;
    private _thirdwebAuth: ReturnType<typeof createAuth> | null = null;
    private domain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN 

    constructor(){
        super()
        if (!this.privateKey) throw new Error("Missing THIRDWEB_ADMIN_PRIVATE_KEY in environment variables.");
        if(!this.domain) throw new Error("Missing NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN in env variables.")
        this.initializeAuth();
        
    }
    
    private initializeAuth(): void {
        if (!this.privateKey) throw new Error("Missing THIRDWEB_ADMIN_PRIVATE_KEY in environment variables.");
        if(!this.domain) throw new Error("Missing NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN in env variables.")
        try {
            this._thirdwebAuth = createAuth({
                domain: this.domain ,
                adminAccount: privateKeyToAccount({ client: this.client, privateKey: this.privateKey }),
            });
        } catch (error) {
            console.error("Failed to initialize ThirdwebAuth:", error);
            throw error;
        }
    }

    // Método para asegurar que thirdwebAuth está inicializado antes de su uso
    protected get thirdwebAuth() {
        if (!this._thirdwebAuth) {
            throw new Error("ThirdwebAuth not initialized. Initialization failed or was not called.");
        }
        return this._thirdwebAuth;
    }

    // Métodos implementados para manejar la autenticación
    public async generatePayload(params: GenerateLoginPayloadParams): Promise<LoginPayload> {
        return this.thirdwebAuth.generatePayload(params);
    }

    public async verifyPayload(params: VerifyLoginPayloadParams): Promise<VerifyLoginPayloadResult> {
        return this.thirdwebAuth.verifyPayload(params);
    }

    public async generateJWT(payload: GenerateJWTParams): Promise<GenerateJWTReturnType> {
        return this.thirdwebAuth.generateJWT(payload);
    }

    public async verifyJWT(token: VerifyJWTParamsType): Promise<VerifyJWTReturnType> {
        return this.thirdwebAuth.verifyJWT(token);
    }
}