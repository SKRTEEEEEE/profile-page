"use client"

import { protAdmAct as adminOnlyAction } from "@/actions/auth";
import { deleteTech } from "@/actions/techs/delete";
import { ExtendedJWTPayload, JWTContext } from "@/core/application/services/auth";

import { Spinner, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { LuDelete } from "react-icons/lu";


type DeleteTechButtonProps = {
  name: string;
  onError: (error: string) => void;
  session: false | ExtendedJWTPayload
}
// type FlattenCtx = {
//   isAdmin: boolean;
//   [key: string]: any; // Permite otras propiedades dinámicas

// };


//Ojo con la session aqui!!! ✅

const useCookies = (session: false | ExtendedJWTPayload) => {
  if (session !== false) {
    const ctx: {} | JWTContext = session.ctx || {};
    // console.log("ctx", ctx);
    if (Object.keys(ctx).length > 0 && (ctx as JWTContext).role === "ADMIN") {
      // Se establece isAdmin en true si el rol es ADMIN
      return { isAdmin: true, address: session.sub };
    }
    // Si no es ADMIN, se establece isAdmin en false
    return { isAdmin: false, address: session.sub };
  } else {
    return { isAdmin: false, address: false };
  }
}

const DeleteTechButton: React.FC<DeleteTechButtonProps> = ({ session, name, onError }) => {
  // console.log("session delete-tech-button: ", session)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAdmin, address } = useCookies(session);
  

  // console.log("isAdmin delete admin tech: ", isAdmin)
  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (!isAdmin) {
        onError(`Administrador no válido: ${address}`)
        return alert("Only admin can do")
      }
      if (address) {
        const response = await adminOnlyAction()
        if (response) {
          const res = await deleteTech(name);
          console.log("Deleted:", res);
          if (res) {
            onError(`Eliminación de ${name} completada.`);
          } else {
            onError(`No se pudo eliminar ${name}`);
          }
        } 
        // else {
        //   onError(response.message)
        // }
      }



    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al eliminar tech', error.message);
        onError(error.message);
      } else {
        console.error('Error al eliminar tech', error);
        onError("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <Tooltip color="danger" content={isAdmin ? "Delete user" : "Only Admin"}>
          <button
            onClick={handleClick}
            disabled={!isAdmin}
            style={{
              background: 'none',
              border: 'none',
              cursor: !isAdmin ? 'not-allowed' : 'pointer',
              padding: 0,
            }}
            aria-disabled={!isAdmin}
          >
            <LuDelete size={"45px"} />
          </button>
        </Tooltip>
      )}
    </>
  );
};

export default DeleteTechButton;