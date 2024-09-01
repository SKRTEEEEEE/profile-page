"use client"

import { useActiveAccount } from "thirdweb/react"
import { Button } from "./ui/button"
import { generatePayload } from "@/actions/auth"
import { signLoginPayload } from "thirdweb/auth"
import { makeAdmin } from "@/actions/user"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { RoleType } from "@/core/domain/entities/Role"

export default function MakeAdminButton({solicitudAdmin, id,role, userIsAdmin}:{solicitudAdmin:boolean, id: string,role:RoleType|null, userIsAdmin:boolean}) {
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
    
      return solicitudAdmin ? (
        <form onSubmit={handleSubmit}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    disabled={!account || !userIsAdmin}
                    variant="default"
                    className="bg-accent hover:bg-accent/60"
                    type="submit"
                  >
                    Solicita admin
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {!userIsAdmin ? (
                  <p>Solo admin</p>
                ) : !account ? (
                  <p>Iniciar sesión</p>
                ) : (
                  <p>Dar admin</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
      ) : (role?<Button disabled variant="ghost">{role}</Button>:
        <Button disabled variant="ghost">No solicita</Button>
      )
}