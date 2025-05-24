import { ApiResponseError } from "@/dynamic.types";
import { ApiBaseRepository, Modules } from "./base.repository";
import { TechBase, TechForm } from "@/core/domain/entities/tech";
import { cookies } from "next/headers";
import { UserUpdateNodemailer } from "@/core/application/interfaces/entities/user";
import { MongooseBase } from "../mongoose/types";
import { VerifyLoginPayloadParams } from "thirdweb/auth";

export class ApiUserRepository extends ApiBaseRepository {
    constructor(baseUrl?: string) {
        super(Modules.USER, baseUrl);
    }
    async readAll() {
        console.log(this.getEndpointModule("readAll"));
        const response = await fetch(
            this.getEndpointModule("readAll"),
            {
                method: this.endpoints.readAll.method,
                headers: {
                    "Content-type": "application/json",
                }
            }
        );
        if (!response.ok) throw new ApiResponseError("readAll", { module: this.module, optionalMessage: `Error reading all users: ${response.statusText}` });
        return await response.json();
    }
    async login(data: {payload: VerifyLoginPayloadParams}) {
        const jwt = (await cookies()).get("jwt");
        const response = await fetch(
            this.getEndpointModule("login"),
            {
                method: this.endpoints.login.method,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${jwt?.value}`
                },
                body: JSON.stringify(data)
            }
        );
        if (!response.ok) throw new ApiResponseError("create", { module: this.module, optionalMessage: `Error creating user: ${response.statusText}` });
        return await response.json();
    }
    async update(tech: UserUpdateNodemailer<MongooseBase>){
        const jwt = (await cookies()).get("jwt");
        const response = await fetch(
            this.getEndpointModule("update"),
            {
                method: this.endpoints.update.method,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${jwt?.value}`
                },
                body: JSON.stringify(tech)
            }
        );
        if (!response.ok) throw new ApiResponseError("update", { module: this.module, optionalMessage: `Error updating user: ${response.statusText}` });
        return await response.json();
    }
    async readById(id: string) {
        const response = await fetch(
            this.getEndpointModule("readById").replace(":id", id),
            {
                method: this.endpoints.readById.method,
                headers: {
                    "Content-type": "application/json",
                }
            }
        );
        if (!response.ok) throw new ApiResponseError("readById", { module: this.module, optionalMessage: `Error reading user by ID: ${response.statusText}` });
        return await response.json();
    }
    async updateByIdSolicitud(id: string, solicitud: string | null) {
        const jwt = (await cookies()).get("jwt");
        const response = await fetch(
            this.getEndpointModule("updateByIdSolicitud"),
            {
                method: this.endpoints.updateSolicitud.method,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${jwt?.value}`
                },
                body: JSON.stringify({ id, solicitud })
            }
        );
        if (!response.ok) throw new ApiResponseError("updateByIdSolicitud", { module: this.module, optionalMessage: `Error updating user request by ID: ${response.statusText}` });
        return await response.json();
    }
}