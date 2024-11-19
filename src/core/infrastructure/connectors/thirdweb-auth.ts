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
}