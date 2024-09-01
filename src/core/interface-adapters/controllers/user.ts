import { tokenGenerator } from "@/core/application/usecases/compound/user";
import { setJwtUC } from "@/core/application/usecases/services/auth";
import { findUserByIdUC, updateUserFormUC, updateUserTokenVerificationUC, updateUserUC } from "@/core/application/usecases/atomic/user";
// import { RoleType } from "@/core/domain/entities/Role";
import { DatabaseOperationError, SetEnvError } from "@/core/domain/errors/main";
import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { createVerificationEmailUC, sendMailUC } from "@/core/application/usecases/services/email";
// import { createRoleUC } from "@/core/application/usecases/atomic/role";
import { ExtendedJWTPayload } from "@/core/application/services/auth";

// Nos vamos a saltar esta capa, total igualmente la app sigue siendo la unica capa que tocara con el framework, manteniendo las otras capas separadas, no es estrictamente necesario, aunque es mas correcto


export const updateUserFormC = async(payload: VerifyLoginPayloadParams,user:{id:string, email:string|null,nick?:string,img:string|null}): Promise<ExtendedJWTPayload | null> => {
    let verifyToken, verifyTokenExpire;
    const userB = await findUserByIdUC(user.id)
    if (!userB) throw new DatabaseOperationError("User not found")
    //Ojo con esto, hemos de manejar cuando el usuario vuelva a cambiar el correo
    if(user.email !== null && userB.email !== user.email ){
        const {hashedToken, expireDate} = tokenGenerator()
        verifyToken = hashedToken
        verifyTokenExpire = expireDate.toString()
        const base = process.env.NEXT_PUBLIC_BASE_URL
        if(!base)throw new SetEnvError("public base")
        const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?verifyToken=${verifyToken}&id=${user.id}`;
        const html = createVerificationEmailUC(verificationLink);
        await sendMailUC({to: user.email, subject: "Email Verification",html})
    }
    await updateUserFormUC({...user, verifyToken, verifyTokenExpire})
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
