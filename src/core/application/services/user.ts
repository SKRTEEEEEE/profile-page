// application/services/user-auth.ts

import { ExtendedJWTPayload } from "@/types/auth";
import { LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import { User, UserBase } from "@/core/domain/entities/User";
import { RoleType } from "@/core/domain/entities/Role";
import crypto from "crypto"
import { verificationEmailTemplate } from "@/lib/verification-email";
import { nodemailerEmailRepository } from "@/core/infrastructure/repositories/nodemailer-email-repository";
import { UserRepository } from "../repositories/user-repository";
import { AuthRepository } from "../repositories/auth-repository";
import { RoleRepository } from "../repositories/role-repository";
// user-auth service

abstract class UseUserAuthService {
  constructor(protected userRepository: UserRepository, protected authRepository: AuthRepository) { }
}
export class LoginUser extends UseUserAuthService {
  async execute(payload: VerifyLoginPayloadParams): Promise<ExtendedJWTPayload> {
    const verifiedPayload = await this.authRepository.verifyPayload(payload);
    if (!verifiedPayload.valid) throw new Error("Payload not valid")
    let user = await this.userRepository.findByAddress(verifiedPayload.payload.address);
    if (!user) {
      user = await this.userRepository.create({ address: verifiedPayload.payload.address, roleId: null, role: null, solicitud: null, img: null, email: null })
    }

    const jwt = await this.authRepository.setJwt(
      payload,
      {
        role: user.role || undefined,
        nick: user.nick,
        id: user.id
        // Puedes agregar más datos al contexto si es necesario
      }
    );

    return jwt

  }
}

export class TokenGenerator {
  private generateToken(): string{
    return crypto.randomBytes(20).toString("hex")
  }
  private hashToken(token:string): string{
    return crypto.createHash("sha256").update(token).digest("hex")
  }
  generateVerificationToken(): {hashedToken: string, expireDate: Date}{
    const verificationToken = this.generateToken();
    const hashedToken = this.hashToken(verificationToken);
    const expireDate = new Date(Date.now() + 30 * 60 * 1000); 
    return{
      hashedToken, expireDate
    }
  }
}


//Aqui haremos el update de las cosas que puede hacer el usuario corriente, para dar admin a un usuario que loha solicitado se creara una nueva funcion limitada a los admin
export class UpdateUser extends UseUserAuthService {
  async execute(payload: VerifyLoginPayloadParams, user: Omit<UserBase, "roleId" | "role" | "address" | "isVerified">): Promise<ExtendedJWTPayload | null> {
    let verifyToken, verifyTokenExpire;
    const userB = await this.userRepository.findById(user.id)
    if (!userB) throw new Error("No user in bdd")
    if (user.email !==null&&!userB.isVerified){
      const t = new TokenGenerator()
      const {hashedToken, expireDate} = t.generateVerificationToken()
      verifyToken = hashedToken
      verifyTokenExpire = expireDate.toString()
      const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?verifyToken=${verifyToken}&id=${user.id}`;
      const html = verificationEmailTemplate(verificationLink);
      // Send verification email      
      await nodemailerEmailRepository.sendMail({to: user.email, subject:"Email Verification", html});
    }
    // Actualiza el usuario
    const updatedUser = await this.userRepository.update({ ...user, address: userB.address, role: userB.role, roleId: userB.roleId, verifyToken, verifyTokenExpire, isVerified: userB.isVerified })
    if (!updatedUser) throw new Error("Error at update user")
      

    const newJWT = await this.authRepository.setJwt(payload,
      {
        role: userB.role||undefined,
        nick: user.nick,
        id: user.id
        // Puedes agregar más datos al contexto si es necesario
      })
    return newJWT;

  }
}
export class UserInCookies extends UseUserAuthService {
  async execute(): Promise<User | false> {
    const cooki = await this.authRepository.getCookies()
    if (!cooki) return false
    const user = await this.userRepository.findByAddress(cooki.sub)
    if (!user) return false
    return user
  }
}

// user-role services
// abstract class UseUserRoleService {
//   constructor(protected userRepository: UserRepository, protected roleRepository: RoleRepository) { }
// }

// class AssignRoleToUser extends UseUserRoleService{
//   async execute(userId: string, rolePermission: RoleType) {
//     const user = await this.userRepository.findById(userId)
//     if (!user) throw new Error("User not found")
//     const newRole = { address: user.address, permissions: rolePermission }
//     const createdRole = await this.roleRepository.create(newRole)
//     console.log("createdRole: ", createdRole)
//     await this.userRepository.update({ id:userId,address: user.address, roleId: createdRole.id, 
//         isAdmin: user.isAdmin, solicitudAdmin: user.solicitudAdmin })
// }
// }
// export class UserRoleService extends UseUserRoleService {

//   async assignRoleToUser(userId: string, rolePermission: RoleType) {
//       const user = await this.userRepository.findById(userId)
//       if (!user) throw new Error("User not found")
//       const newRole = { address: user.address, permissions: rolePermission }
//       const createdRole = await this.roleRepository.create(newRole)
//       console.log("createdRole: ", createdRole)
//       await this.userRepository.update({ id:userId,address: user.address, roleId: createdRole.id, 
//           isAdmin: user.isAdmin, solicitudAdmin: user.solicitudAdmin })
//   }
//   async deleteRole(idRole: string, idUser: string): Promise<void> {
//       await this.roleRepository.delete(idRole)
//       await this.userRepository.deleteRoleId(idUser)
//   }
//   // ⬇️🧠Traspasado a UserRoleAuthServices
//   // async deleteUser(id: string): Promise<void> {
//   //     const user = await this.userRepository.findById(id)
//   //     if (!user) throw new Error("User not found")
//   //     if (user.roleId !== null) {
//   //         await this.roleRepository.delete(user.roleId)
//   //     }
//   //     return await this.userRepository.delete(id)
//   // }
// }


abstract class UseUserRoleAuthService {
  constructor(protected userRepository: UserRepository, protected roleRepository: RoleRepository, protected authRepository: AuthRepository) { }
}
export class DeleteUserAccount extends UseUserRoleAuthService {

  async execute(payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
  }, id: string, address: string) {
    const v = await this.authRepository.verifyPayload(payload)
    if (!v.valid) throw new Error("Error with payload auth")
    if (v.payload.address !== address) throw new Error("User only can delete her address")

    //deleteUser(id)
    const user = await this.userRepository.findById(id)
    if (!user) throw new Error("User not found")
    if (user.roleId !== null) {
      await this.roleRepository.delete(user.roleId)
    }
    await this.userRepository.delete(id)
    await this.authRepository.logout()
  }

}


// Remember update user isAdmin, and solicitudAdmin in bdd!!!!
export class MakeAdmin extends UseUserRoleAuthService {
  async execute(payload: {
    signature: `0x${string}`;
    payload: LoginPayload;
  }, id: string) {
    const v = await this.authRepository.verifyPayload(payload)
    if (!v.valid) throw new Error("Error with payload auth")
    const signUser = await this.userRepository.findByAddress(v.payload.address)
    if (!signUser) throw new Error("Error at find signer user")
    if (signUser.role!=="ADMIN") throw new Error("Only admins can do this action")
    // const a = new AssignRoleToUser(this.userRepository,this.roleRepository)
    // a.execute(id, "ADMIN" as RoleType)
    const user = await this.userRepository.findById(id)
    if (!user) throw new Error("User not found")
    const newRole = { address: user.address, permissions: "ADMIN" as RoleType }
    const createdRole = await this.roleRepository.create(newRole)
    console.log("createdRole: ", createdRole)
    await this.userRepository.update({
      id, address: user.address, roleId: createdRole.id,
      role: RoleType["ADMIN"], solicitud: null, img: user.img, email: user.email, isVerified: user.isVerified
    })


  }
}