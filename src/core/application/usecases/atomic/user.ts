import { User, UserBase } from "@/core/domain/entities/User";

import { RoleType } from "@/core/domain/entities/Role";
import { DatabaseOperationError } from "@/core/domain/errors/main";
import { userRepository } from "@/core/infrastructure/repositories/mongoose-user";
import { UserRepository } from "../../repositories/user";

abstract class UseUser {
    constructor(protected userRepository:UserRepository){}
}
export type UpdateUserFormProps = {id:string, solicitud:RoleType|null, email:string|null,nick?:string,img:string|null, verifyToken?: string, verifyTokenExpire?: string}
class UpdateUserForm extends UseUser{
    async execute(user:UpdateUserFormProps): Promise<User> {
        const fUser = await this.userRepository.findById(user.id)
        if(!fUser)throw new DatabaseOperationError("User not found at Update User use-case")
        return this.userRepository.update({...fUser, email: user.email, img: user.img, nick: user.nick, solicitud: user.solicitud, verifyToken: user.verifyToken, verifyTokenExpire: user.verifyTokenExpire}) 
    }
}
export const updateUserFormUC = async (user:UpdateUserFormProps) => {
    const u = new UpdateUserForm(userRepository)
    return await u.execute(user)
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
