"use client"

import { generatePayload, isLoggedIn, login, logout } from "@/actions/auth"
import { client } from "@/lib/utils"
import { ConnectButton, useActiveWallet } from "thirdweb/react"

export const CConectButton =  () =>{
      
    return(
        <ConnectButton
        client={client}
        auth={{
            isLoggedIn: async (address:string )=> {
                console.log("check if logged in: ", {address})
                return await isLoggedIn()
            },
            doLogin: async (params) => {
                console.log("loggin in!")
                await login(params)
            },
            getLoginPayload: async ({address}) => generatePayload({address}),
            doLogout: async () => {
                console.log("logging out!")
                await logout()
            }
        }}/>
    )
}