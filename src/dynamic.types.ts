
import type { JSX } from "react";
import { DomainError } from "./core/domain/flows/domain.error";
import { LengBase } from "@/core/domain/entities/tech";
import { MongooseBase } from "@/core/infrastructure/mongoose/types";
import { RoleBase } from "./core/domain/entities/role";
import { Modules } from "./core/infrastructure/api/base.repository";

export type Role = RoleBase & MongooseBase
export type Leng = LengBase & MongooseBase
export enum ErrorAppCodes {
    STORAGE_ACTION = "STORAGE_ACTION",
    API_RESPONSE = "API_RESPONSE"
}

export class StorageActionError extends DomainError {
    constructor(action: string,location:Function, meta?: {
        type?: string,
        optionalMessage?:string,
    }){
        super(
            `Action: Storage ${action} ${meta?.type} doesn't worked` ,
            ErrorAppCodes.STORAGE_ACTION,
            location.name, undefined,
            {optionalMessage:meta?.optionalMessage}
        )
    }
}
export class ApiResponseError extends DomainError{
    constructor(action: string,location: Function, meta?: {
        module?: string | Modules,
        optionalMessage?: string | undefined
    })
    {
        super(
            `Action: Api Response ${action} ${meta?.module} doesn't worked. ${meta?.optionalMessage}` ,
            ErrorAppCodes.API_RESPONSE,
            location.name
        )
    }
}
// Other tech data 
// Site config data
export type DataSiteConfig = {
  logo: {
      path: string;
      render: JSX.Element;
  };
  paths: {
      id: string;
      path: string;
      title: string;
  }[];
  icons: {
    id: string;
    path: string;
    title: string;
    render: JSX.Element;
    blank: boolean;
}[];
}

