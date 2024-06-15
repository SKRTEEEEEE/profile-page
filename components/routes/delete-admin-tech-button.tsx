// "use client"

// import { deleteTech} from "@/actions/badges";
// import { Spinner } from "@nextui-org/react";
// import { useState } from "react";
// import { LuDelete } from "react-icons/lu";

// // const mockDeleteTech = (name:string) => {
// //     return new Promise((resolve, reject) => {
// //       setTimeout(() => {
// //         // Simula el comportamiento de éxito o fallo
// //         if (Math.random() > 0.5) {
// //           resolve(true); // Simula una eliminación exitosa
// //         } else {
// //           reject(new Error(`Error al eliminar ${name}`)); // Simula un error
// //         }
// //       }, 1000); // Simula un retraso de 1 segundo
// //     });
// //   };

// interface DeleteTechButtonProps {
//     name: string;
//     onError: (error: string) => void; // Función de callback para pasar el error
//     isAdmin: boolean;
// }

// const DeleteTechButton: React.FC<DeleteTechButtonProps> = ({ isAdmin ,name, onError }) => {
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     return (
//         <>
//             {isLoading ? <Spinner size="lg" /> : <LuDelete size={"45px"} onClick={
//                 async () => {
//                     setIsLoading(true);
//                     try {
//                         // Aquí haremos la comprobación de que es admin del "servidor"
//                         const res = await deleteTech(name);
//                         console.log("Deleted:", res);
//                         if(res){
//                             onError(`Eliminación de ${name} completada.`)
//                         } else {
//                             onError(`No se pudo eliminar ${name}`)
//                         }
//                     } catch (error) {
//                         if (error instanceof Error) {
//                             console.error('Error al eliminar tech', error.message);
//                             onError(error.message); // Llamar a la función de callback con el mensaje de error
//                         } else {
//                             console.error('Error al eliminar tech', error);
//                             onError("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
//                         }
//                     } finally {
//                         setIsLoading(false);
//                         // Se hace el revalidatePath en el servidor -> deleteTech()
//                     }
//                 }
//             } 
//             />}
//         </>
//     );
// }
// export default DeleteTechButton


"use client"

import { actionAdmin, generatePayload } from "@/actions/auth";
import { deleteTech } from "@/actions/badges";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";
import { LuDelete } from "react-icons/lu";
import { signLoginPayload } from "thirdweb/auth";
import { useActiveAccount } from "thirdweb/react";

interface DeleteTechButtonProps {
  name: string;
  onError: (error: string) => void; // Función de callback para pasar el error
  
  isAdmin: boolean;
  account: ReturnType<typeof useActiveAccount> | null;
  //Aunque se podría pasar solo un argumento(account), ya que esta creado isAdmin nos ahorramos eso
}

const DeleteTechButton: React.FC<DeleteTechButtonProps> = ({ isAdmin, name, onError, account }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
        if(!isAdmin){
            return alert("Only admin can do")
        }
        if(account){
            const payload = await generatePayload({ address: account.address });
            const signatureResult = await signLoginPayload({ account, payload });
            const response = await actionAdmin(signatureResult, false) //Le decimos que no haga el revalidatePath ya que se haca en el deleteTech()
            if(response.success){
                const res = await deleteTech(name);
                console.log("Deleted:", res);
                if (res) {
                    onError(`Eliminación de ${name} completada.`);
                } else {
                    onError(`No se pudo eliminar ${name}`);
                }
            }else{
                onError(`Administrador no válido: ${account.address}`)
            }
        }


      
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al eliminar tech', error.message);
        onError(error.message); // Llamar a la función de callback con el mensaje de error
      } else {
        console.error('Error al eliminar tech', error);
        onError("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
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
      )}
    </>
  );
};

export default DeleteTechButton;