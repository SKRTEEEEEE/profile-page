"use client"

import { deleteUser } from "@/actions/user-role";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { Button } from "./ui/button";
import { generatePayload } from "@/actions/auth";
import { signLoginPayload } from "thirdweb/auth";
import { UserX } from "lucide-react"



export default function DeleteUserButton({id, address}:{id:string, address: string}) {
    const account =  useActiveAccount()
    const wallet = useActiveWallet()
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if(!account){
          throw new Error("Please connect your wallet")
        }
        
    
        try {
            const payload = await generatePayload({address: account.address})
            const signatureRes = await signLoginPayload({account, payload})
            await deleteUser(signatureRes, id,address)
            if(wallet!==undefined){
                wallet.disconnect()
            }
        } catch (error) {
            console.error("Error at delete user: "+error)
        }
      }
    return (
        <form onSubmit={handleSubmit}>
        <Button variant="destructive" disabled={!account}  type="submit">
        <UserX />
            Delete Account
        </Button>
        </form>
    )
} 