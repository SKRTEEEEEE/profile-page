import { admins } from '@/data/data';
import { useActiveAccount } from 'thirdweb/react';

const ADMIN_ADDRESS = "0x490bb233c707A0841cA52979Be4D88B6621d1988";


export const includesAdminDir = () =>{
  const account = useActiveAccount();

  const isAdmin = admins.includes(account?.address || '');
  console.log("isAdmin includes funct: ", isAdmin)

  return { isAdmin, account };
};
export const useIsAdmin = () => {
  const account = useActiveAccount();

  
  const isAdmin = account?.address === ADMIN_ADDRESS;



  
  // // Verificar si la dirección de la cuenta activa está en la lista de direcciones de administradores
  // const isAdmin = adminAddresses.includes(account?.address);
  console.log("admins: ", admins)
  return { isAdmin, account };
};