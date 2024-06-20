"use server";
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "@/app/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {  UserModel } from "@/models/user-schema";
import { connectToDB } from "@/utils/db-connect";
import { revrd } from "./revrd";


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
// export async function actionAdmin(payload: VerifyLoginPayloadParams, path: string | false): Promise<ActionAdminResponse> {
//   const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
//   console.log("verifiedPayload :", verifiedPayload)
//   if (verifiedPayload.valid ) {
//     if(verifiedPayload.payload.address === "0x490bb233c707A0841cA52979Be4D88B6621d1988"){
//       const jwt = await thirdwebAuth.generateJWT({
//         payload: verifiedPayload.payload,
//         context: {
//           isAdmin: true,
//           nick: "Pepe"
//         }
//       });
//       cookies().set("jwt", jwt);
//     //   // redirect to the secure page
//     //   return redirect("/jwt-admin-action");
//     path && revalidatePath(path);
//     return {message: `Una acción ha sido realizada en ${path}`, success: true}
//     }
//     else{
//       return {message: "Usuario no reconocido como administrador", success: false}
//     }
    
//   }
// //   return {message: "Error con el verifiedPayload", success: false}
//     return {message: "Error. Enviar un correo si persiste", success: false}
// }

// Funciones de inicio de sesión

//Funciona pero no con el switch Account
export async function login(payload: VerifyLoginPayloadParams): Promise<string | null> {
  await connectToDB();
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
  if (verifiedPayload.valid) {
    const user = await UserModel.findOne({ address: verifiedPayload.payload.address });
    if (user) {
      const jwt = await thirdwebAuth.generateJWT({
        payload: verifiedPayload.payload,
        context: {
          isAdmin: user.isAdmin,
          nick: user.nick
        }
      });
      cookies().set("jwt", jwt);
      return jwt;
    }else {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
      context:{
        isAdmin: false,
      }
    });
    cookies().set("jwt", jwt);
    console.log("jwt login: ", jwt)
    return jwt;
  }
  } 
  return null;
}


// Función de para rutas protegidas de usuarios logeados -> Falta test
export async function isLoggedIn() {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return false;
  }
 
  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return false;
  }
  return true;
}

// Función de comprobación de acciones protegidas -> Falta terminar y hacer test
export async function protectedAction(path: string | false): Promise<ActionAdminResponse> {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    path && redirect(path);
    return { message: "Debes iniciar sesión para realizar esta acción", success: false };
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return { message: "Token de autenticación no válido", success: false };
  }

  path && revalidatePath(path);
  return { message: `Una acción protegida ha sido realizada en ${path}`, success: true };
}

/*  
Función de comprobación de acciones solo para administradores
=============================================================

- Esta función tiene un pequeño error o bug?, el cual al hacer uso de Switch Account, del ConnectButton, este no refresca el token y por lo tanto, aquí puedes forzar un error(confirmado) salta error.
Lo bueno es que esta limitado en el cliente y ahi si que salta error/se deshabilita la acción 
También es verdad que al final al hacer switch account se esta utilizando la misma propietaria de la "wallet"...
*/
export async function adminOnlyAction(): Promise<ActionAdminResponse> {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    // path && redirect(path);
    return { message: "Debes iniciar sesión para realizar esta acción", success: false };
  }
  console.log("jwt value: ", jwt.value)

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return { message: "Token de autenticación no válido", success: false };
  }
  console.log("authResult: ", authResult)

  // Se asume que authResult.parsedJWT es de tipo JWTPayload y se accede al campo de contexto personalizado
  // const parsedJWT = authResult.parsedJWT as any & { context: { isAdmin?: boolean } };
  const parsedJWT = authResult.parsedJWT as any;
  const isAdmin = parsedJWT.ctx?.isAdmin;

  if (!isAdmin) {
    return { message: "No tienes permisos de administrador para realizar esta acción", success: false };
  }

  
  return { message: `Una acción de administrador ha sido realizada`, success: true };
}



// Para -> protected route "only admin"
// Falta comprobar que funcione ¿y adaptarla para admin, ahora genérica/user con session iniciada"
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
