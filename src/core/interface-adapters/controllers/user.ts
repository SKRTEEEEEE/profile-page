import { tokenGenerator } from "@/core/application/usecases/compound/user";
import { setJwtUC } from "@/core/application/usecases/services/auth";
import { findUserAndUpdateUC, findUserByIdUC, updateUserByIdUC, updateUserFormUC, updateUserTokenVerificationUC, updateUserUC } from "@/core/application/usecases/atomic/user";
// import { RoleType } from "@/core/domain/entities/Role";
import { DatabaseOperationError, SetEnvError } from "@/core/domain/errors/main";
import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { createVerificationEmailUC, sendMailUC } from "@/core/application/usecases/services/email";
// import { createRoleUC } from "@/core/application/usecases/atomic/role";
import { ExtendedJWTPayload } from "@/core/application/interfaces/services/auth";
import { constructEventWebhookUC, deleteCustomerUC, retrieveSessionUC, retrieveSubscriptionUC } from "@/core/application/usecases/services/pay";
import { RoleType } from "@/core/domain/entities/Role";
import { User } from "@/core/domain/entities/User";
import { createRoleUC, findOneRoleAndDeleteUC, listRoleUC, updateRoleUC } from "@/core/application/usecases/atomic/role";
import Stripe from "stripe";

// Nos vamos a saltar esta capa, total igualmente la app sigue siendo la unica capa que tocara con el framework, manteniendo las otras capas separadas, no es estrictamente necesario, aunque es mas correcto


export const updateUserFormC = async(payload: VerifyLoginPayloadParams,user:{id:string, email:string|null,nick?:string,img:string|null}): Promise<ExtendedJWTPayload | null> => {
    let verifyToken, verifyTokenExpire;
    const userB = await findUserByIdUC(user.id)
    if (!userB) throw new DatabaseOperationError("User not found")
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
    await updateUserFormUC({...user, verifyToken, verifyTokenExpire, isVerified})
    return await setJwtUC(payload,{nick:user.nick,id: user.id, role: userB.role || undefined})
}
export const resendVerificationEmailC = async({id,email}:{id:string, email: string}) => {
    const {hashedToken, expireDate} = tokenGenerator()

        const base = process.env.NEXT_PUBLIC_BASE_URL
        if(!base)throw new SetEnvError("public base")
        const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?verifyToken=${hashedToken}&id=${id}`;
        const html = createVerificationEmailUC(verificationLink);
        const res = await sendMailUC({to: email, subject: "Email Verification",html})
        
        const upU = await updateUserTokenVerificationUC(id,hashedToken,expireDate.toString())
        return {updatedUser: upU, sendedMail: res}
}

export const verifyEmailC = async (id: string, verifyToken: string): Promise<boolean> => {
    const user = await findUserByIdUC(id);
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
    console.log("User before update:", user);

    // if(user.solicitud===RoleType["STUDENT"]) {
    //     user.solicitud = null;
    //     user.role = RoleType["STUDENT"]
    //     const createdRole = await createRoleUC(user.address,RoleType["STUDENT"])
    //     user.roleId = createdRole.id
    // }
    const sUser= await updateUserUC(user);
    console.log(sUser)
    return true;
}
export const checkoutSessionCompletedC = async (session: Stripe.Response<Stripe.Checkout.Session>) => {
    
    const user: User | null = await findUserByIdUC(session.client_reference_id!);
    if (!user) throw new Error("Error with client_reference_id")
    if (!session.metadata || !session.metadata.role) throw new Error("Error at set metadata role")
    const role = await listRoleUC(user.roleId!)

    if (user.role === RoleType.STUDENT || user.role === RoleType.STUDENT_PRO) {
        if(!role)throw new Error("Error with role")
      const stripeCustomerId = role.stripeCustomerId
      // const subscriptionId = role.subscriptionId
      console.log("role: ",{role})
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
        // await role.save()
        const updatedUser = await updateUserByIdUC(user.id, { roleId: role.id, role: session.metadata.role });
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
      const updatedUser = await updateUserByIdUC(user.id, {role: session.metadata.role})
      if(!updatedUser) {throw new Error( `Error at find user ${user.id}` )}else{
      console.log("updatedUser: ", {updatedUser})}
       
    }
}
export const customerSubscriptionDeletedC = async (subscriptionId: string) => {
    try {
        const subscription = await retrieveSubscriptionUC(subscriptionId);
        // console.log("subscription: ", { subscription })
        const role = await findOneRoleAndDeleteUC({ stripeCustomerId: subscription.customer as string });
        
        // 💡 Corregido: Se usa 'return' en lugar de 'break'
        if (!role) return; // Si no se encuentra el rol, salimos de la función
        
        const user = await findUserAndUpdateUC({ address: role.address }, { role: null, roleId: null });
        
        console.log("updated user: ", { user });
        console.log("deleted role: ", { role });
        
    } catch (error) {
        console.error("Error at handle delete subscription: ", error);
    }
};

