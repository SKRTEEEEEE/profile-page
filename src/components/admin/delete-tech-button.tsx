"use client"

import { protAdmAct as adminOnlyAction } from "@/actions/auth";
import { deleteTech } from "@/actions/techs/delete";
import { ExtendedJWTPayload, JWTContext } from "@/core/application/services/auth";

import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { FaSpinner } from "react-icons/fa";


type DeleteTechButtonProps = {
  name: string;
  onError: (error: string) => void;
  isAdmin: boolean;
}
// type FlattenCtx = {
//   isAdmin: boolean;
//   [key: string]: any; // Permite otras propiedades dinámicas

// };
    {/* <button
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
        </Tooltip>*/}

//Ojo con la session aqui!!! 🧠 En vez de pasar la session paso si es admin, menos trabajo en el cliente

// const useCookies = (session: false | ExtendedJWTPayload) => {
//   if (session !== false) {
//     const ctx: {} | JWTContext = session.ctx || {};
//     // console.log("ctx", ctx);
//     if (Object.keys(ctx).length > 0 && (ctx as JWTContext).role === "ADMIN") {
//       // Se establece isAdmin en true si el rol es ADMIN
//       return { isAdmin: true, address: session.sub };
//     }
//     // Si no es ADMIN, se establece isAdmin en false
//     return { isAdmin: false, address: session.sub };
//   } else {
//     return { isAdmin: false, address: false };
//   }
// }

const DeleteTechButton: React.FC<DeleteTechButtonProps> = ({ isAdmin, name, onError }) => {
  // console.log("session delete-tech-button: ", session)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  // console.log("isAdmin delete admin tech: ", isAdmin)
  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (!isAdmin) {
        onError(`Administrador no válido`)
        return alert("Only admin can do")
      }
      else {
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
        <FaSpinner size="lg" />
      ) : (
        // <Tooltip color="danger" content={isAdmin ? "Delete user" : "Only Admin"}>
        //   <Button onClick={handleClick}
        //   disabled={!isAdmin} variant="ghost" size="icon">
        //               <Trash2 className="h-4 w-4 text-destructive" />
        //               <span className="sr-only">Delete {name}</span>
        //             </Button>

                    <TooltipProvider>
                    <Tooltip>

                      <TooltipTrigger asChild>
                                <Button variant={"ghost"} onClick={handleClick}><Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Delete {name}</span></Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-transparent border-none p-0">
                              <Button style={{cursor: !isAdmin?"not-allowed":"pointer"}} variant={"destructive"} disabled={!isAdmin} type="submit">{isAdmin ?  `Eliminar ${name}` : "Solo Admin"}</Button>
                              </TooltipContent>
                  </Tooltip></TooltipProvider>
      
      )}
    </>
  );
};

export default DeleteTechButton;