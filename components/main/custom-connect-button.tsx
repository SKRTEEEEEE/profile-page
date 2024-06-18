"use client"

import { generatePayload, isLoggedIn, login, logout } from "@/actions/auth";
import { client } from "@/app/client";
import { ConnectButton } from "thirdweb/react";

const CConnectButton = () => {

    return(
        <ConnectButton
        client={client}
        auth={{
          isLoggedIn: async (address) => {
            console.log("checking if logged in!", { address });
            return await isLoggedIn();
          },
          doLogin: async (params) => {
            console.log("logging in!");
            await login(params);
          },
          getLoginPayload: async ({ address }) =>
            generatePayload({ address }),
          doLogout: async () => {
            console.log("logging out!");
            await logout();
          },
        }}
        
      />
    )
}

export default CConnectButton