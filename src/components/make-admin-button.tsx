"use client"

import { useActiveAccount } from "thirdweb/react"
import { Button } from "./ui/button"
import { generatePayload } from "@/actions/auth"
import { signLoginPayload } from "thirdweb/auth"
import { makeAdmin } from "@/actions/user-role"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

export default function MakeAdminButton({solicitudAdmin, id, userIsAdmin}:{solicitudAdmin:boolean, id: string, userIsAdmin:boolean}) {
    const account = useActiveAccount()
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if(!account){
          throw new Error("Please connect your wallet")
        }
        try {
            const payload = await generatePayload({address: account.address})
            const signatureRes = await signLoginPayload({account, payload})
            await makeAdmin(signatureRes, id)

        } catch (error) {
            console.error("Error at delete user: "+error)
        }
      }
    return (
        <form onSubmit={handleSubmit}>
  {solicitudAdmin ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span><Button 
            disabled={!account || !userIsAdmin} 
            variant="default" 
            className="bg-green-800 hover:bg-green-900/60" 
            type="submit"
          >
            Conceder
          </Button> </span>
          
        </TooltipTrigger>
        <TooltipContent>
          {!userIsAdmin ? 
            <p>Solo admin</p>
           : !account ? 
            <p>Iniciar sesión</p>
           : 
            <p>Dar admin</p>
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Button variant="ghost">No solicita</Button>
  )}
</form>

    )
}