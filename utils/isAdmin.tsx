import { fetchAdmins } from "@/data/fetch";
import { useActiveAccount } from "thirdweb/react";

// const ADMIN_ADDRESS = "0x490bb233c707A0841cA52979Be4D88B6621d1988";

export const useIsAdmin = async () => {
  const account = useActiveAccount();
  const admins = await fetchAdmins()

  const adminAddresses = admins.map(admin => admin.address);
  
  const isAdmin = adminAddresses.includes(account?.address);

  return { isAdmin, account };
};