import { User } from "@/core/domain/entities/User";

import { RoleType } from "@/core/domain/entities/Role";
import { DatabaseOperationError } from "@/core/domain/errors/main";
import { userRepository } from "@/core/infrastructure/repositories/mongoose-user-repository";
import { UserRepository } from "../../repositories/user-repository";

abstract class UseUser {
    constructor(protected userRepository:UserRepository){}
}

export const listUsersByIdUC = async (id:string) => {
    return await userRepository.findById(id)
}
// export class CreateUser extends UseUser{
//   async execute(user: Omit<UserBase, 'id'>): Promise<User> {
//     const createdUser = await this.userRepository.create(user);
//     return createdUser;
//   }
// }

export const listUsersUC = async () => {
    return await userRepository.findAll()
}
export class UpdateUserForm extends UseUser{
    async execute(user:UpdateUserFormProps): Promise<User> {
        const fUser = await this.userRepository.findById(user.id)
        if(!fUser)throw new DatabaseOperationError("User not found at Update User use-case")
        return this.userRepository.update({...fUser, email: user.email, img: user.img, nick: user.nick, solicitud: user.solicitud}) 
    }
}
export const updateUserFormUC = async (user:UpdateUserFormProps) => {
    const u = new UpdateUserForm(userRepository)
    return await u.execute(user)
}

export type UpdateUserFormProps = {id:string, solicitud:RoleType|null, email:string|null,nick?:string,img:string|null}
// export class DeleteUserRoleId extends UseUser {
//     async execute(id:string){
//         return await this.userRepository.deleteRoleId(id)
//     }
// }
// export class FindUserByAddress extends UseUser {
//     async execute(address:string){
//         return await this.userRepository.findByAddress(address)
//     }
// }
export const findUserByIdUC = async (id:string) => {
    return await userRepository.findById(id)
}

export class VerifyEmail extends UseUser {
    async execute(id:string, verifyToken: string): Promise<boolean>{
        const user = await this.userRepository.findById(id);
        if (!user) {
            console.error("Error at find user");
            return false;
        } 
        if (user.verifyToken !== verifyToken) {
            console.error("Error at validate token");
            return false;
        }
        if (user.verifyTokenExpire && new Date(user.verifyTokenExpire) <= new Date()) {
            console.error("Error with token time");
            return false;
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;
        // Falta poner el user.role al student si el ha solicitado user.role
        // if(user.solicitud===RoleType["STUDENT"]) {
        //     user.solicitud = null;
        //     user.role
        // }

        await this.userRepository.update(user);
        return true;
    }
}