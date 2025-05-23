export enum Modules {
    PRE_TECH = "PRE_TECH",
    PROJECTS = "PROJECTS",
    ROLE = "ROLE",
    TECH = "TECH",
    USER = "USER"
}

type EndpointConfig = {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
};

type ModuleConfig = {
    [key: string]: EndpointConfig;
};

type ModulesMap = {
    [key in Modules]: ModuleConfig;
};

export abstract class ApiBaseRepository {
    private readonly _baseUrl: string;
    private readonly module: Modules;
    private readonly modules: ModulesMap = {
        [Modules.PRE_TECH]: {
            readByQuery: { endpoint: "pre-tech", method: "GET" },
            updatePreTech: { endpoint: "pre-tech", method: "POST" }
        },
        [Modules.PROJECTS]: {
            // Ejemplo: list: { endpoint: "projects", method: "GET" }
        },
        [Modules.ROLE]: {},
        [Modules.TECH]: {},
        [Modules.USER]: {}
    };

    constructor(module: Modules, baseUrl?: string) {
        this.module = module;
        this._baseUrl = baseUrl ?? 'http://localhost:3001';
    }
    public get baseUrl(){
        return this._baseUrl;
    }
    // Getter para exponer dinámicamente los endpoints del módulo actual
    public get endpoints() {
        const config = this.getModuleConfig();
        // Devuelve un proxy para acceder dinámicamente a cada endpoint
        return new Proxy(config, {
            get: (target, prop: string) => {
                if (prop in target) {
                    return {
                        endpoint: target[prop].endpoint,
                        method: target[prop].method
                    };
                }
                throw new Error(`Endpoint '${prop}' not found in module '${this.module}'`);
            }
        });
    }

    // Métodos privados para uso interno
    private getModuleConfig(): ModuleConfig {
        return this.modules[this.module];
    }

    protected getEndpointConfig(key: keyof ModuleConfig): EndpointConfig | undefined {
        return this.getModuleConfig()[key as string];
    }
}