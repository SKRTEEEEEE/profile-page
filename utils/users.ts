import { IUser } from "@/models/user-schema";
import { FlattenUsers } from "./utils.types";



export const flattenUsers = (users: IUser[]): FlattenUsers[] =>{
    return users.map(user=>({
        nick: user.nick?.toString(),
        address: user.address.toString(),
        isAdmin: user.isAdmin,
        solicitudAdmin: user.solicitudAdmin,
        ...(user.img && { img: user.img })
    }))
}