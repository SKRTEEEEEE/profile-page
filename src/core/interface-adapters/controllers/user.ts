import { tokenGenerator } from "@/core/application/usecases/compound/user";
import { setJwtUC } from "@/core/application/usecases/services/auth";
import { findUserByIdUC, updateUserFormUC, updateUserUC } from "@/core/application/usecases/atomic/user";
import { RoleType } from "@/core/domain/entities/Role";
import { DatabaseOperationError, SetEnvError } from "@/core/domain/errors/main";
import { ExtendedJWTPayload } from "@/types/auth";
import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { createVerificationEmailUC, sendMailUC } from "@/core/application/usecases/services/email";
import { createRoleUC } from "@/core/application/usecases/atomic/role";

// Nos vamos a saltar esta capa, total igualmente la app sigue siendo la unica capa que tocara con el framework, manteniendo las otras capas separadas, no es estrictamente necesario, aunque es mas correcto


export const updateUserFormC = async(payload: VerifyLoginPayloadParams,user:{id:string,solicitud:RoleType|null, email:string|null,nick?:string,img:string|null}): Promise<ExtendedJWTPayload | null> => {
    let verifyToken, verifyTokenExpire;
    const userB = await findUserByIdUC(user.id)
    if (!userB) throw new DatabaseOperationError("User not found")
    if(user.email !== null && !userB.isVerified){
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
    return await setJwtUC(payload,{nick:user.nick,id: user.id})
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
    // ⚠️‼️ Falta poner el user.role al student si el ha solicitado user.role

    if(user.solicitud===RoleType["STUDENT"]) {
        user.solicitud = null;
        user.role = RoleType["STUDENT"]
        const createdRole = await createRoleUC(user.address,RoleType["STUDENT"])
        user.roleId = createdRole.id
    }
    //Hay que mirar porque no se pone en undefined los verifyToken, and Expire
    const sUser= await updateUserUC(user);
    console.log(sUser)
    return true;
}