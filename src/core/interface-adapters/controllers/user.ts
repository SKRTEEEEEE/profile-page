import { tokenGenerator } from "@/core/application/usecases/compound/user";
import { setJwtUC } from "@/core/application/usecases/services/auth";
import { findUserByIdUC, updateUserFormUC } from "@/core/application/usecases/atomic/user";
import { RoleType } from "@/core/domain/entities/Role";
import { DatabaseOperationError, SetEnvError } from "@/core/domain/errors/main";
import { ExtendedJWTPayload } from "@/types/auth";
import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { createVerificationEmailUC, sendMailUC } from "@/core/application/usecases/services/email";

export const updateUserForm = async(payload: VerifyLoginPayloadParams,user:{id:string,solicitud:RoleType|null, email:string|null,nick?:string,img:string|null}): Promise<ExtendedJWTPayload | null> => {
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
    await updateUserFormUC(user)
    return await setJwtUC(payload,{nick:user.nick,id: user.id})
}