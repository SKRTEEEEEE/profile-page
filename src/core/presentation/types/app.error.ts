import { DomainError } from "@/core/domain/flows/domain.error";

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