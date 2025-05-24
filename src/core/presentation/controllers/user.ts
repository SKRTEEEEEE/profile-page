import { getCookiesUC, logoutUC, setJwtUC, verifyPayloadUC } from "@/core/application/usecases/services/auth";
import { mongooseCreateUserUC, mongooseDeleteUserByIdUC, mongooseFindUserAndUpdateUC, mongooseListUserByAddressUC, mongooseListUsersByIdUC, mongooseUpdateUserByIdUC } from "@/core/application/usecases/entities/user";
// import { RoleType } from "@/core/domain/entities/role";
import { DatabaseFindError, DatabaseActionError, SetEnvError, UnauthorizedError } from "@/core/domain/flows/domain.error";
import { LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import { createVerificationEmailUC, sendMailUC } from "@/core/application/usecases/services/email";
// import { createRoleUC } from "@/core/application/usecases/atomic/role";
import {  ExtendedJWTPayload } from "@/core/application/interfaces/services/auth";
import { deleteCustomerUC,  retrieveSubscriptionUC } from "@/core/application/usecases/services/pay";
import { createRoleUC, deleteRoleByIdUC, findOneRoleAndDeleteUC, listRoleUC, updateRoleUC } from "@/core/application/usecases/entities/role";
import Stripe from "stripe";
import crypto from "crypto"
import { RoleType } from "@/core/domain/entities/role.type";
import { MongooseBase } from "@/core/infrastructure/mongoose/types";

class TokenGenerator {
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
export const tokenGenerator = () => {
  const t = new TokenGenerator()
  return t.generateVerificationToken()
}


export const updateUserFormCMongoose = async(payload: VerifyLoginPayloadParams,user:{id:string, email:string|null,nick?:string,img:string|null}): Promise<ExtendedJWTPayload | null> => {
    let verifyToken, verifyTokenExpire;
    const userB = await mongooseListUsersByIdUC(user.id)
    if (!userB) throw new DatabaseActionError("User not found")
    //Ojo con esto, hemos de manejar cuando el usuario vuelva a cambiar el correo
    let isVerified = userB.isVerified
    if(user.email !== null && userB.email !== user.email ){
        const {hashedToken, expireDate} = tokenGenerator()
        verifyToken = hashedToken
        verifyTokenExpire = expireDate.toString()
        const base = process.env.NEXT_PUBLIC_BASE_URL
        if(!base)throw new SetEnvError("public base")
        const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?verifyToken=${verifyToken}&id=${user.id}`;
        const html = createVerificationEmailUC(verificationLink);
        await sendMailUC({to: user.email, subject: "Email Verification",html})
        isVerified = false
    }
    const res = await mongooseUpdateUserByIdUC(user.id, {...user, verifyToken, verifyTokenExpire, isVerified})
    if(!res) throw new DatabaseActionError("update user form")
    return await setJwtUC(payload,{nick:user.nick,id: user.id, role: userB.role, img: user.img || undefined})
} //✅⁉️
export const resendVerificationEmailCMongoose = async({id,email}:{id:string, email: string}) => {
    const {hashedToken, expireDate} = tokenGenerator()

        const base = process.env.NEXT_PUBLIC_BASE_URL
        if(!base)throw new SetEnvError("public base")
        const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?verifyToken=${hashedToken}&id=${id}`;
        const html = createVerificationEmailUC(verificationLink);
        const res = await sendMailUC({to: email, subject: "Email Verification",html})
        
        const upU = await mongooseUpdateUserByIdUC(id, {verifyToken: hashedToken, verifyTokenExpire: expireDate.toString()})
        return {updatedUser: upU, sendedMail: res}
}//✅⁉️

export const verifyEmailCMongoose = async (id: string, verifyToken: string): Promise<boolean> => {
    const user = await mongooseListUsersByIdUC(id);
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
    // ⚠️‼️ Esta parte en el futuro sera un botón de "subscripción"

    const sUser = await mongooseUpdateUserByIdUC(user.id, user)
    if(!sUser) throw new DatabaseActionError("update user")
    console.log(sUser)
    return true;
} //⚠️🚧
export const checkoutSessionCompletedC = async (session: Stripe.Response<Stripe.Checkout.Session>) => {
    
    const user: User<MongooseBase> | null = await mongooseListUsersByIdUC(session.client_reference_id!);
    if (!user) throw new Error("Error with client_reference_id")
    if (!session.metadata || !session.metadata.role) throw new Error("Error at set metadata role")
    const role = await listRoleUC(user.roleId!)

    if (user.role === RoleType.STUDENT || user.role === RoleType.STUDENT_PRO) {
        if(!role)throw new Error("Error with role")
      const stripeCustomerId = role.stripeCustomerId
      // const subscriptionId = role.subscriptionId
      if (!stripeCustomerId) {
        throw new Error("stripeCustomerId is undefined");
    }
    

      console.log("Cancelling previous subscription...");

      try {
        
        await deleteCustomerUC(stripeCustomerId!)
     
        console.log("Previous user deleted successfully");
      } catch (error) {
        console.error("Error cancelling previous subscription:", error);
        throw error;
      }
    }
    if (!user.roleId) {
      const role = await createRoleUC({
        address: user.address,
        permissions: session.metadata.role as RoleType,
        stripeCustomerId: session.customer as string,
        subscriptionId: session.subscription as string,
        subscriptionStatus: session.status as string
      })
      console.log("Role created: ", role)
      try {
        const updatedUser = await mongooseUpdateUserByIdUC(user.id, { roleId: role.id, role: session.metadata.role as RoleType });
        if(!updatedUser){ throw new Error(`Error at find user ${user.id}: `) }else {
            console.log("updatedUser: ", updatedUser)
        }
      } catch (saveError) {
        console.error("Error saving role or updating user:", saveError)
        throw saveError
      }

    } 
    else {
    if(!role) throw new Error("error at set role")
      //Update: Primero entra aqui
      role.stripeCustomerId = session.customer as string
      role.subscriptionId = session.subscription as string
      role.subscriptionStatus = session.status as string
      role.permissions = session.metadata.role as RoleType
    //   const savedRole = await role.save()
        console.log("role info to be updated: ", {role})
      const updatedRole =  await updateRoleUC(role.id, role)
      console.log("updatedRole :", {updatedRole})
      const updatedUser = await mongooseUpdateUserByIdUC(user.id, {role: session.metadata.role as RoleType})
      if(!updatedUser) {throw new Error( `Error at find user ${user.id}` )}else{
      console.log("updatedUser: ", {updatedUser})}
       
    }
}//🚧⁉️
export const customerSubscriptionDeletedC = async (subscriptionId: string) => {
    try {
        const subscription = await retrieveSubscriptionUC(subscriptionId);
        const role = await findOneRoleAndDeleteUC({filter:{ stripeCustomerId: subscription.customer as string }});
        
        // 💡 Corregido: Se usa 'return' en lugar de 'break'
        if (!role) return; // Si no se encuentra el rol, salimos de la función
        
        const user = await mongooseFindUserAndUpdateUC({filter:{ address: role.address }, update:{ role: null, roleId: null }});
        
        console.log("updated user: ", { user });
        console.log("deleted role: ", { role });
        
    } catch (error) {
        console.error("Error at handle delete subscription: ", error);
    }
};//🚧⁉️



export const deleteUserAccountUCMongoose = async (payload: {
  signature: `0x${string}`;
  payload: LoginPayload;
}, id: string, address: string) => {
  const v = await verifyPayloadUC(payload)
  if (!v.valid) throw new UnauthorizedError("Error with payload auth")
  if (v.payload.address !== address) throw new UnauthorizedError("User only can delete her address")

  //deleteUser(id)
  const user = await mongooseListUsersByIdUC(id)
  if (!user) throw new DatabaseFindError({optionalMessage:"User not found"})
  if (user.roleId !== null) {
    await deleteRoleByIdUC(user.roleId)
  }
  await mongooseDeleteUserByIdUC(id)
  await logoutUC()
}//🚧


export const giveRoleUCMongoose = async(payload: {
  signature: `0x${string}`;
  payload: LoginPayload;
}, id: string, solicitud: RoleType.ADMIN ) => {
  const v = await verifyPayloadUC(payload)
    if (!v.valid) throw new UnauthorizedError("payload auth")
      const signUser = await mongooseListUserByAddressUC(payload.payload.address)
    if (!signUser) throw new DatabaseFindError({optionalMessage:"signer user"})
    if (signUser.role!=="ADMIN") throw new UnauthorizedError("Only admins")
    const createdRole = await createRoleUC({address: payload.payload.address,permissions: solicitud})
    const user = await mongooseListUsersByIdUC(id)
    if(!user)throw new DatabaseFindError({entitie:"user"})
    await mongooseUpdateUserByIdUC(id,{
       address: user.address, roleId: createdRole.id,
      role: solicitud, solicitud: null, img: user.img, email: user.email, isVerified: user.isVerified
    })
}//🚧







export const loginUserUCMongoose = async (payload: VerifyLoginPayloadParams) => {
  const verifiedPayload = await verifyPayloadUC(payload);
  if (!verifiedPayload.valid) throw new UnauthorizedError("Payload not valid")
  let user = await mongooseListUserByAddressUC(verifiedPayload.payload.address);
  if (!user) {
    user = await mongooseCreateUserUC({ address: verifiedPayload.payload.address, nick: null, roleId: null, role: null, solicitud: null, img: null, email: null , isVerified: false})
  }

  const jwt = await setJwtUC(
    payload,
    {
      role: user.role,
      nick: user.nick,
      id: user.id,
      img: user.img || undefined
    }
  );
  return jwt
}//✅⁉️



export const userInCookiesUC = async () => {
  const cooki = await getCookiesUC()
    if (!cooki) return false
    const user = await mongooseListUserByAddressUC(cooki.sub)
    if (!user) return false
    return user
}//✅⁉️
