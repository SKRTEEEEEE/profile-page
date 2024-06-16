"use server";
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "@/app/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


  interface ActionAdminResponse {
    message: string;
    success: boolean;
  }

const privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY || "";

if (!privateKey) {
  throw new Error("Missing THIRDWEB_ADMIN_PRIVATE_KEY in .env file.");
}

const thirdwebAuth = createAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  adminAccount: privateKeyToAccount({ client, privateKey }),
});

export const generatePayload = thirdwebAuth.generatePayload;

//"login" that can only be handled by a "admin" user
export async function actionAdmin(payload: VerifyLoginPayloadParams, path: string | false): Promise<ActionAdminResponse> {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
  console.log("verifiedPayload :", verifiedPayload)
  if (verifiedPayload.valid ) {
    if(verifiedPayload.payload.address === "0x490bb233c707A0841cA52979Be4D88B6621d1988"){
      const jwt = await thirdwebAuth.generateJWT({
        payload: verifiedPayload.payload,
      });
      cookies().set("jwt", jwt);
    //   // redirect to the secure page
    //   return redirect("/jwt-admin-action");
    path && revalidatePath(path);
    return {message: `Una acción ha sido realizada en ${path}`, success: true}
    }
    else{
      return {message: "Usuario no reconocido como administrador", success: false}
    }
    
  }
//   return {message: "Error con el verifiedPayload", success: false}
    return {message: "Error. Enviar un correo si persiste", success: false}
}

// Para -> protected route "only admin"
export async function authedOnlyAdmin() {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    redirect("/jwt-cookie");//Redirigir a tal pagina, esto estaria bien pasarlo como argumento
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    redirect("/jwt-cookie");
  }
  return authResult.parsedJWT;
}

export async function logout() {
  cookies().delete("jwt");
}