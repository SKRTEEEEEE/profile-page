import { User, UserBase } from "@/core/domain/entities/User";
import { UserRepository } from "../repositories/user-repository";
import { ExtendedJWTPayload } from "@/types/auth";
import { RoleType } from "@/core/domain/entities/Role";
import { DatabaseOperationError } from "@/core/domain/errors/main";

abstract class UseUser {
    constructor(protected userRepository:UserRepository){}
}
export class ListUserById extends UseUser{
    async execute(id:string){
        const user = await this.userRepository.findById(id)
        return user
    }
}
// export class CreateUser extends UseUser{
//   async execute(user: Omit<UserBase, 'id'>): Promise<User> {
//     const createdUser = await this.userRepository.create(user);
//     return createdUser;
//   }
// }

export class ListUsers extends UseUser{
    async execute(): Promise<User[]|null> {
        return await this.userRepository.findAll()
    }
}
export class UpdateUserForm extends UseUser{
    async execute(user:{id: string,email: string, nick: string, img: string, solicitud: RoleType}): Promise<User> {
        const fUser = await this.userRepository.findById(user.id)
        if(!fUser)throw new DatabaseOperationError("User not found at Update User use-case")
        return this.userRepository.update({...fUser, email: user.email, img: user.img, nick: user.nick, solicitud: user.solicitud}) 
    }
}
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