"use client"

import { adminOnlyAction, generatePayload, updateUserAdminStatus} from "@/actions/auth";
// import { deleteTech } from "@/actions/badges";
import { useIsAdmin } from "@/utils/isAdmin";
import { Spinner, Tooltip } from "@nextui-org/react";
import {  useState } from "react";
import { LuDelete } from "react-icons/lu";
import { signLoginPayload } from "thirdweb/auth";

// import { useActiveAccount } from "thirdweb/react";

interface DeleteTechButtonProps {
  address: string;
//   onError: (error: string) => void; // Función de callback para pasar el error
  
//   isAdmin: boolean;
//   account: ReturnType<typeof useActiveAccount> | null;
  //Aunque se podría pasar solo un argumento(account), ya que esta creado isAdmin nos ahorramos eso
}

const GiveAdminButton: React.FC<DeleteTechButtonProps> = ({  address }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const account = useActiveAccount();
//   const [isAdmin, setIsAdmin] = useState(false);
//   useEffect(() => {
//     setIsAdmin(account?.address === "0x490bb233c707A0841cA52979Be4D88B6621d1988");
//   }, [account]);
    
    // const isAdmin = account?.address === "0x490bb233c707A0841cA52979Be4D88B6621d1988";
    // console.log("isAdmin (ButtonTable): ",isAdmin)



    const { isAdmin, account } = useIsAdmin();
    // const isAdmin = true;
    // const account = {address: "0x490bb233c707A0841cA52979Be4D88B6621d1988"}
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
            const response = await adminOnlyAction(false) //Le decimos que no haga el revalidatePath ya que se haca en el deleteTech()
            // const response = await adminOnlyAction(false);
            if(response.success){
                const payload = await generatePayload({ address: account.address });
                const signatureResult = await signLoginPayload({ account, payload });
                const res = await updateUserAdminStatus(signatureResult, isAdmin, address)
                console.log("Asigned:", res);
                if (res) {
                    // onError(`Asignación de ${name} completada.`);
                } else {
                    // onError(`No se pudo asignar a ${name}`);
                }
            }else{
                // onError(response.message)
            }
        }


      
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error al dar permisos de admin a ${name}`, error.message);
        // onError(error.message); // Llamar a la función de callback con el mensaje de error
      } else {
        console.error(`Error al dar permisos de admin a ${name}`, error);
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