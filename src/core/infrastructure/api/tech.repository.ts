import { ApiResponseError } from "@/dynamic.types";
import { ApiBaseRepository, Modules } from "./base.repository";
import { FullTechData, FwBase, LengBase, LibBase, ReadAllFlattenTechsRes, TechBase, TechForm } from "@/core/domain/entities/tech";
import { cookies } from "next/headers";
import { MongooseBase } from "../mongoose/types";
import { ActualizarGithubTechsType } from "@/core/presentation/controllers/tech/github.controller";
import { ResFlow } from "@/core/domain/flows/res.type";

export class ApiTechRepository extends ApiBaseRepository {
    constructor(baseUrl?:string){
        super(Modules.TECH, baseUrl)
    }
    async create(data: TechBase | LengBase | FwBase | LibBase){
        const jwt = (await cookies()).get("jwt");
        const response = await fetch(
            this.getEndpointModule("create"),
            {
                method: this.endpoints.create.method,
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${jwt?.value}`
                }
                ,body: JSON.stringify(data)
            }
        )
        if(!response.ok)throw new ApiResponseError("create",ApiTechRepository,{module: this.module})
        const res = await response.json();
        console.log("data", res)
        return res
    }
    async update(tech: TechForm){
        const jwt = (await cookies()).get("jwt");
        const response = await fetch(
            this.getEndpointModule("update"),
            {
                method: this.endpoints.update.method,
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${jwt?.value}`
                }
                ,body: JSON.stringify(tech)
            }
        )
        if(!response.ok)throw new ApiResponseError("update",ApiTechRepository,{module: this.module})
        const res = await response.json();
        console.log("data", res)
        return res
    }
    async actualizarGithub(props:{type: ActualizarGithubTechsType}){
        // const endpoints = this.getDynamicEndpointModule("actualizarGithub",["all", "md", "json"])
        // console.log("endpoints", endpoints) //Debe devolver un array de endpoints con /tech/(all|md|json)
        const jwt = (await cookies()).get("jwt");
        const endpoint = this.getDynamicEndpointModule("actualizarGithub", props.type as unknown as string);
        console.log("endpoint", endpoint)
        if (!endpoint || Array.isArray(endpoint)) {
            throw new Error("Invalid endpoint returned from getDynamicEndpointModule");
        }
        const response = await fetch(
            endpoint,
            {
                method: this.endpoints.actualizarGithub.method,
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${jwt?.value}`
                }
                // ,body: JSON.stringify(data)
            }
        )
        const res = await response.json();
        console.log("data", res)
        return res

    }
    async readAll(): Promise<ResFlow<ReadAllFlattenTechsRes<MongooseBase>>>{
        const response = await fetch(
            this.getDynamicEndpointModule("readAll", "full") as string,
            {
                method: this.endpoints.readAll.method,
                headers: {
                    "Content-type": "application/json",
                    // 'Authorization': `Bearer ${jwt?.value}`
                }
            }
        )
        if(!response.ok)throw new ApiResponseError("readAll",ApiTechRepository,{module: this.module})
        const res = await response.json();
        return res
    }
    async delete( body: {nameId: string}){
        const jwt = (await cookies()).get("jwt");
        const response = await fetch(
            this.getEndpointModule("delete"),
            {
                method: this.endpoints.delete.method,
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${jwt?.value}`
                }
                ,body: JSON.stringify(body)
            }
        )
        if(!response.ok)throw new ApiResponseError("delete",ApiTechRepository,{module: this.module})
        const res = await response.json();
        console.log("data", res)
        return res
    }
}