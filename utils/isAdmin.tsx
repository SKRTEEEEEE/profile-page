import { fetchAdmins } from "@/data/fetch";
import { useActiveAccount } from "thirdweb/react";

const ADMIN_ADDRESS = "0x490bb233c707A0841cA52979Be4D88B6621d1988";

export const useIsAdmin = async () => {
  const account = useActiveAccount();
  const admins = await fetchAdmins()
  
  const isAdmin = account?.address === ADMIN_ADDRESS;
  const adminAddresses = admins.map(admin => admin.address);
  console.log("adminAddresses: ", adminAddresses)

  
  // // Verificar si la dirección de la cuenta activa está en la lista de direcciones de administradores
  // const isAdmin = adminAddresses.includes(account?.address);
  console.log("admins: ", admins)
  return { isAdmin, account };
};