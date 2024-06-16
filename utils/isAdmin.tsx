import { useActiveAccount } from "thirdweb/react";

const ADMIN_ADDRESS = "0x490bb233c707A0841cA52979Be4D88B6621d1988";

export const useIsAdmin = () => {
  const account = useActiveAccount();
  const isAdmin = account?.address === ADMIN_ADDRESS;

  return { isAdmin, account };
};