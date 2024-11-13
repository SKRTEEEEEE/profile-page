"use client"

import { adminOnlyAction, RGetCookies } from "@/actions/auth";
import { deleteTech } from "@/actions/techs/delete";
import { useCookies } from "@/utils/auth";

import { Spinner, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { LuDelete } from "react-icons/lu";


type DeleteTechButtonProps = {
  name: string;
  onError: (error: string) => void;
  session: RGetCookies
}
// type FlattenCtx = {
//   isAdmin: boolean;
//   [key: string]: any; // Permite otras propiedades dinámicas

// };



const DeleteTechButton: React.FC<DeleteTechButtonProps> = ({ session, name, onError }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAdmin, address } = useCookies(session);
  

  console.log("isAdmin delete admin tech: ", isAdmin)
  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (!isAdmin) {
        onError(`Administrador no válido: ${address}`)
        return alert("Only admin can do")
      }
      if (address) {
        const response = await adminOnlyAction()
        if (response.success) {
          const res = await deleteTech(name);
          console.log("Deleted:", res);
          if (res) {
            onError(`Eliminación de ${name} completada.`);
          } else {
            onError(`No se pudo eliminar ${name}`);
          }
        } else {
          onError(response.message)
        }
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