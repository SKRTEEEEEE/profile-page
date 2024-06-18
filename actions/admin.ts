"use server"

/*
Función para hacer a un usuario Admin
=====================================
*/

import { AdminModel, UserModel } from "@/models/user-schema";
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { cookies } from "next/headers";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "@/app/client";


const privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY || "";

if (!privateKey) {
  throw new Error("Missing THIRDWEB_ADMIN_PRIVATE_KEY in .env file.");
}

const thirdwebAuth = createAuth({
    domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
    adminAccount: privateKeyToAccount({ client, privateKey }),
  });

interface ActionAdminResponse {
    message: string;
    success: boolean;
  }
  
  export const updateUserAdminStatus = async (
    payload: VerifyLoginPayloadParams,
    isAdmin: boolean,
    address: string, 
  ): Promise<ActionAdminResponse> => {
    try {
      // Verificar la validez del payload utilizando thirdwebAuth
      const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
  
      if (!verifiedPayload.valid) {
        return { message: 'Token de autenticación no válido', success: false };
      }
  
      // Buscar al usuario por su dirección en la base de datos
      const user = await UserModel.findOne({ address });
  
      if (!user) {
        return { message: 'Usuario no encontrado', success: false };
      }
  
      // Actualizar el estado isAdmin del usuario
      user.isAdmin = isAdmin;
      user.solicitudAdmin = false;
      await user.save();
  
      // Manejar la tabla de administradores según el estado isAdmin
      if (isAdmin) {
        await AdminModel.create({ userId: user._id, address: user.address });
      } else {
        await AdminModel.findOneAndDelete({ userId: user._id });
      }
  
      // Generar un nuevo JWT con el contexto actualizado si es necesario (opcional)
      const jwt = await thirdwebAuth.generateJWT({
        payload: verifiedPayload.payload,
        context: {
          isAdmin: isAdmin,
          nick: user.nick
        }
      });
  
      // Establecer la cookie JWT con el nuevo token (opcional)
      cookies().set('jwt', jwt);
  
      return { message: `Estado de isAdmin actualizado exitosamente para ${user.nick}`, success: true };
    } catch (error) {
      console.error('Error al actualizar isAdmin:', error);
      return { message: 'Error interno del servidor', success: false };
    }
  };