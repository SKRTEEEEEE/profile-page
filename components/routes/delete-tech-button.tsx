"use client"

import { adminOnlyAction} from "@/actions/auth";
import { deleteTech } from "@/actions/techs/delete";
import useIsAdmin from "@/hooks/useIsAdmin";
import { FlattenAdmin } from "@/utils/utils.types";
import { Spinner, Tooltip } from "@nextui-org/react";
import {  useState } from "react";
import { LuDelete } from "react-icons/lu";

// import { useActiveAccount } from "thirdweb/react";

type DeleteTechButtonProps = {
  // isAdmin: boolean;
  admins: FlattenAdmin[];
  name: string;
  onError: (error: string) => void; // Función de callback para pasar el error  
//   
//   account: ReturnType<typeof useActiveAccount> | null;
}

const DeleteTechButton: React.FC<DeleteTechButtonProps> = ({ admins ,name, onError }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {account, isAdmin} = useIsAdmin(admins)
  console.log("isAdmin delete admin tech: ", isAdmin)
  const handleClick = async () => {
    setIsLoading(true);
    try {
        if(!isAdmin){
            onError(`Administrador no válido: ${account?.address}`)
            return alert("Only admin can do")
        }
        if(account){
          // Esto esta como deshabilitado
            // const payload = await generatePayload({ address: account.address });
            // const signatureResult = await signLoginPayload({ account, payload });
            const response = await adminOnlyAction() //Le decimos que no haga el revalidatePath ya que se haca en el deleteTech()
            // const response = await adminOnlyAction(false);
            if(response.success){
                const res = await deleteTech(name);
                console.log("Deleted:", res);
                if (res) {
                    onError(`Eliminación de ${name} completada.`);
                } else {
                    onError(`No se pudo eliminar ${name}`);
                }
            }else{
                onError(response.message)
            }
        }


      
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al eliminar tech', error.message);
        // onError(error.message); // Llamar a la función de callback con el mensaje de error
      } else {
        console.error('Error al eliminar tech', error);
        // onError("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
      }
    } finally {
      setIsLoading(false);
      // Se hace el revalidatePath en el servidor -> deleteTech()
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <Tooltip color="danger" content={isAdmin?"Delete user":"Only Admin"}>
        <button
          onClick={handleClick}
          disabled={!isAdmin}
          style={{
            background: 'none',
            border: 'none',
            cursor: !isAdmin ? 'not-allowed' : 'pointer',
            padding: 0,
          }}
          aria-disabled={ !isAdmin}
        >
          <LuDelete size={"45px"} />
        </button>
        </Tooltip>
      )}
    </>
  );
};

export default DeleteTechButton;