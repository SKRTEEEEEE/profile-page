import { IUser } from "@/models/user-schema";

export interface IFlattenUsers {
    nick?:string,
    address: string,
    isAdmin: boolean,
    solicitudAdmin: boolean,
}

export const flattenUsers = (users: IUser[]): IFlattenUsers[] =>{
    return users.map(user=>({
        nick: user.nick?.toString(),
        address: user.address.toString(),
        isAdmin: user.isAdmin,
        solicitudAdmin: user.solicitudAdmin
    }))
}