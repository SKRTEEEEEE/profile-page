
import type { JSX } from "react";
import { DomainError } from "./core/domain/flows/domain.error";
import { LengBase } from "@/core/domain/entities/tech";
import { MongooseBase } from "@/core/infrastructure/mongoose/types";
import { RoleBase } from "./core/domain/entities/role";
import { Modules } from "./core/infrastructure/api/base.repository";

export type Role = RoleBase & MongooseBase
export type Leng = LengBase & MongooseBase
export enum ErrorAppCodes {
    STORAGE_ACTION = "STORAGE_ACTION"
}

export class StorageActionError extends DomainError {
    constructor(action: string, meta?: {
        type?: string,
        optionalMessage?:string,
    }){
        super(
            `Action: Storage ${action} ${meta?.type} doesn't worked` ,
            ErrorAppCodes.STORAGE_ACTION,
            meta?.optionalMessage
        )
    }
}
export class ApiResponseError extends DomainError{
    constructor(action: string, meta?: {
        module?: string | Modules,
        optionalMessage?: string,
    })
    {
        super(
            `Action: Api Response ${action} ${meta?.module} doesn't worked` ,
            ErrorAppCodes.STORAGE_ACTION,
            meta?.optionalMessage
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

