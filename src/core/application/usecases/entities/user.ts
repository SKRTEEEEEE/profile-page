import {  User, UserBase } from "@/core/domain/entities/User";

import { userRepository } from "@/core/infrastructure/entities/mongoose-user";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";



export const listUsersByIdUC = async (id:string) => {
    return await userRepository.readById(id)
}

export const listUsersUC = async () => {
    return await userRepository.findAll()
}




// export const updateUserTokenVerificationUC = async (id: string, verifyToken: string, verifyTokenExpire:string)=>{
//     const user = await userRepository.readById(id)
//     if(!user) throw new DatabaseFindError("user by id")
//     user.verifyToken= verifyToken;
//     user.verifyTokenExpire=verifyTokenExpire
//     const upU = await userRepository.updateById(id,user)
//     return upU
// }


// abstract class UseUser {
    //     constructor(protected userRepository:UserRepository){}
    // }
    // export const updateUserFormUC = async (user:UpdateUserFormProps) => {
        //     const u = new UpdateUserForm(userRepository)
        //     return await u.execute(user)
        // }
        // export type UpdateUserFormProps = {id:string, email:string|null,nick?:string,img:string|null, isVerified: boolean, verifyToken?: string, verifyTokenExpire?: string}
        // class UpdateUserForm extends UseUser{
            //     async execute(user:UpdateUserFormProps): Promise<User> {
                //         const fUser = await this.userRepository.readById(user.id)
                //         if(!fUser)throw new DatabaseOperationError("User not found at Update User use-case")
                //         const res = await this.userRepository.updateById(user.id,{...fUser, isVerified: user.isVerified, email: user.email, img: user.img, nick: user.nick, verifyToken: user.verifyToken, verifyTokenExpire: user.verifyTokenExpire})
//         if(!res)throw new DatabaseOperationError("update user")
//         return res
//     }
// }
export const findUserAndUpdateUC = async (filter?: FilterQuery<User> | undefined, update?: UpdateQuery<any> | undefined, options?: QueryOptions<any> | null | undefined)=> {
    return await userRepository.update(filter, update, options)
}
export const updateUserByIdUC = async (id:string, user?: UpdateQuery<UserBase> | undefined) => {
    return await userRepository.updateById(id, user)
}



