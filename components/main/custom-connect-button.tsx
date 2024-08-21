"use client"

import { generatePayload, getCookies, isLoggedIn, login, logout } from "@/actions/auth";
import { client } from "@/app/client";
import { useCookies } from "@/utils/auth";
import { createContext, useEffect, useState } from "react";
import { ConnectButton } from "thirdweb/react";
export const AdminContext = createContext({isAdmin: false})
const CConnectButton = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    console.log("useState isAdmin: ", isAdmin);
  }, [isAdmin]); // Esto se ejecutará cada vez que isAdmin cambie
    return(
      <AdminContext.Provider value={{isAdmin}}>
        <ConnectButton
        client={client}
        auth={{
          isLoggedIn: async (address) => {
            // console.log("checking if logged in!", { address });
            return await isLoggedIn();
          },
          doLogin: async (params) => {
            // console.log("logging in!");
            const res = await login(params);
            if(res) {
              const session = await getCookies()
              if(session !== false){
                const {isAdmin: userIsAdmin} = useCookies(session)
                console.log("userIsAdmin: ",userIsAdmin)
                if(userIsAdmin!==undefined)setIsAdmin(userIsAdmin)
              }

            }
          },
          getLoginPayload: async ({ address }) =>
            generatePayload({ address }),
          doLogout: async () => {
            console.log("logging out!");
            await logout();
          },
        }}
        
      />
      </AdminContext.Provider>
    )
}
export default CConnectButton