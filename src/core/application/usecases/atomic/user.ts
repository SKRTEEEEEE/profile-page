import { User, UserBase } from "@/core/domain/entities/User";

import { DatabaseFindError, DatabaseOperationError } from "@/core/domain/errors/main";
import { userRepository } from "@/core/infrastructure/repositories/mongoose-user";
import { UserRepository } from "../../repositories/user";

abstract class UseUser {
    constructor(protected userRepository:UserRepository){}
}
export type UpdateUserFormProps = {id:string, email:string|null,nick?:string,img:string|null, isVerified: boolean, verifyToken?: string, verifyTokenExpire?: string}
class UpdateUserForm extends UseUser{
    async execute(user:UpdateUserFormProps): Promise<User> {
        const fUser = await this.userRepository.findById(user.id)
        if(!fUser)throw new DatabaseOperationError("User not found at Update User use-case")
        return this.userRepository.update({...fUser, isVerified: user.isVerified, email: user.email, img: user.img, nick: user.nick, verifyToken: user.verifyToken, verifyTokenExpire: user.verifyTokenExpire}) 
    }
}
export const updateUserFormUC = async (user:UpdateUserFormProps) => {
    const u = new UpdateUserForm(userRepository)
    return await u.execute(user)
}
export const updateUserTokenVerificationUC = async (id: string, verifyToken: string, verifyTokenExpire:string)=>{
    const user = await userRepository.findById(id)
    if(!user) throw new DatabaseFindError("user by id")
    user.verifyToken= verifyToken;
    user.verifyTokenExpire=verifyTokenExpire
    const upU = await userRepository.update(user)
    return upU
}
export const listUsersByIdUC = async (id:string) => {
    return await userRepository.findById(id)
}

export const listUsersUC = async () => {
    return await userRepository.findAll()
}


export const updateUserUC = async (user: UserBase): Promise<User>=> {
    return await userRepository.update(user)
}

export const findUserByIdUC = async (id:string) => {
    return await userRepository.findById(id)
}
