"use client"

import { useActiveAccount } from "thirdweb/react"
import { Button } from "./ui/button"
import { generatePayload } from "@/actions/auth"
import { signLoginPayload } from "thirdweb/auth"
import { giveRole } from "@/actions/user"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { RoleType } from "@/core/domain/entities/Role"
import { HandleOperationError, SetStateError } from "@/core/domain/errors/main"

export default function GiveRoleButton({solicitud, id,role, userIsAdmin}:{solicitud:RoleType|null, id: string,role:RoleType|null, userIsAdmin:boolean}) {
    const account = useActiveAccount()

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if(!account)throw new SetStateError("Please connect your wallet")
        if(solicitud!==RoleType.ADMIN&&solicitud!==RoleType.PROF_TEST) throw new HandleOperationError("Action not corresponding")   
        try {

            const payload = await generatePayload({address: account.address})
            const signatureRes = await signLoginPayload({account, payload})
            await giveRole(signatureRes, id, solicitud)

        } catch (error) {
            console.error("Error at delete user: "+error)
        }
      }
    
      return solicitud ? (
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
                    Solicita {solicitud.toLowerCase()}
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {!userIsAdmin ? (
                  <p>Solo admin puede</p>
                ) : !account ? (
                  <p>Iniciar sesión</p>
                ) : (
                  <p>Dar {solicitud.toLowerCase()}</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
      ) : (role?<Button disabled variant="ghost">{role}</Button>:
        <Button disabled variant="ghost">No solicita</Button>
      )
}