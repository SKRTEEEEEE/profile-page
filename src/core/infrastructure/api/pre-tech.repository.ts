import { ResFlow } from "@/core/domain/flows/res.codes";
import { MongooseBase } from "../mongoose/types";
import { ApiBaseRepository, Modules } from "./base.repository";

export class ApiPreTechRepository extends ApiBaseRepository{

  constructor(baseUrl?: string) {
    super(Modules.PRE_TECH,baseUrl)
  }

  async readByQuery(query: string): Promise<ResFlow<(PreTechBase & MongooseBase)>> {
    const url = `${this.baseUrl}/${this.endpoints.readByQuery.endpoint}?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      method: this.endpoints.readByQuery.method,
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`Error fetching ${this.endpoints.readByQuery.endpoint}: ${response.statusText}`);
    }
    return await response.json();
  }

  async updatePreTech(): Promise<ResFlow> {
    const url = `${this.baseUrl}/${this.endpoints.updatePreTech.endpoint}`;
    //get cookies jwt
    const response = await fetch(url, {
      method: this.endpoints.updatePreTech.method,
      headers: { 
        'Content-Type': 'application/json' 
      },
    });
    if (!response.ok) {
      throw new Error(`Error updating ${this.endpoints.updatePreTech.endpoint}: ${response.statusText}`);
    }
    return await response.json();
  }
}