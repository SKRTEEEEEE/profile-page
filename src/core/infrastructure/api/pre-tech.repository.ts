import { ResFlow } from "@/core/domain/flows/res.type";
import { MongooseBase } from "../mongoose/types";
import { ApiBaseRepository, Modules } from "./base.repository";
import { ApiResponseError } from "@/dynamic.types";
import { cookies } from "next/headers";

export class ApiPreTechRepository extends ApiBaseRepository{

  constructor(baseUrl?: string) {
    super(Modules.PRE_TECH,baseUrl)
  }

  async readByQuery(query: string): Promise<ResFlow<(PreTechBase & MongooseBase)>> {
    const url = `${this.getEndpointModule("readByQuery")}?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      method: this.endpoints.readByQuery.method,
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("response", response)
    if (!response.ok) {
            throw new ApiResponseError("readByQuery", ApiPreTechRepository, {
        module: this.module,
      });
    }
    const data = await response.json();
    console.log("data", data)
    return data
  }

  async updatePreTech(): Promise<ResFlow> {
    const url = `${this.baseUrl}/${this.endpoints.updatePreTech.endpoint}`;
    const jwt = (await cookies()).get("jwt");
    const response = await fetch(url, {
      method: this.endpoints.updatePreTech.method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt?.value}`
      },
    });
    if (!response.ok) {
      throw new ApiResponseError("updatePreTech", ApiPreTechRepository, {
        module: this.module,
      });    }
    const data = await response.json();
    console.log("data", data)
    return data
  }
}