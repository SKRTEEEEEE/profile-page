"use client"

import { updateUserAdminStatus } from "@/actions/admin";
import { adminOnlyAction, generatePayload} from "@/actions/auth";
import { revrd } from "@/actions/revrd";
import useIsAdmin from "@/hooks/useIsAdmin";
import { FlattenedAdmin } from "@/utils/auth";
// import { deleteTech } from "@/actions/badges";
import { Spinner, Tooltip } from "@nextui-org/react";
import {  useState } from "react";
import { LuDelete } from "react-icons/lu";
import { signLoginPayload } from "thirdweb/auth";

// import { useActiveAccount } from "thirdweb/react";

interface DeleteTechButtonProps {
  address: string;
  admins: FlattenedAdmin[];
//   onError: (error: string) => void; // Función de callback para pasar el error
  
//   isAdmin: boolean;
//   account: ReturnType<typeof useActiveAccount> | null;
  //Aunque se podría pasar solo un argumento(account), ya que esta creado isAdmin nos ahorramos eso
}

const GiveAdminButton: React.FC<DeleteTechButtonProps> = ({  address, admins }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAdmin, account } = useIsAdmin(admins);

  const handleClick = async () => {
    setIsLoading(true);
    try {
        if(!isAdmin){
            // onError(`Administrador no válido: ${account?.address}`)
            return alert("Only admin can do")
        }
        if(account){
          // Esto esta como deshabilitado
            // const payload = await generatePayload({ address: account.address });
            // const signatureResult = await signLoginPayload({ account, payload });
            const response = await adminOnlyAction() //Le decimos que no haga el revalidatePath ya que se haca en el deleteTech()
            if(response.success){
                const payload = await generatePayload({ address: account.address });
                const signatureResult = await signLoginPayload({ account, payload });
                const res = await updateUserAdminStatus(signatureResult, isAdmin, address)
                console.log("Asigned:", res);
                if (res) {
                    // onError(`Asignación de ${name} completada.`);
                    await revrd("/admin/users");

                } else {
                    // onError(`No se pudo asignar a ${name}`);
                }
            }else{
                // onError(response.message)
            }
        }


      
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error al dar permisos de admin a ${address}`, error.message);
        // onError(error.message); // Llamar a la función de callback con el mensaje de error
      } else {
        console.error(`Error al dar permisos de admin a ${address}`, error);
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
        <Tooltip color="danger" content={isAdmin?"Give Admin":"Only Admin"}>
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
          <LuDelete size={"45px"} /> Hacer admin
        </button>
        </Tooltip>
      )}
    </>
  );
};

export default GiveAdminButton;