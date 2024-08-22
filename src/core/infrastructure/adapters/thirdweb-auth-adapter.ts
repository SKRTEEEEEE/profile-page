import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { createThirdwebClient, ThirdwebClient } from "thirdweb";


export class ThirdwebClientConfig {
    private clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
    private _client: ThirdwebClient;
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

export abstract class ThirdwebAuthAdapter extends ThirdwebClientConfig{
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
    // No son necesarios ya que thirdwebAuth nos los proviene, y esta es accesible desde las classes extendidas
    // ??En el futuro estaría bien intentar implementar-los como protected y que otra capa mas "exterior los maneje"??
    // public async generatePayload(params: GenerateLoginPayloadParams): Promise<LoginPayload> {
    //     return this.thirdwebAuth.generatePayload(params);
    // }

    // public async verifyPayload(params: VerifyLoginPayloadParams): Promise<VerifyLoginPayloadResult> {
    //     return this.thirdwebAuth.verifyPayload(params);
    // }

    // public async generateJWT(payload: GenerateJWTParams): Promise<GenerateJWTReturnType> {
    //     return this.thirdwebAuth.generateJWT(payload);
    // }

    // public async verifyJWT(token: VerifyJWTParamsType): Promise<VerifyJWTReturnType> {
    //     return this.thirdwebAuth.verifyJWT(token);
    // }
}