"use client"
import { User } from "@/core/domain/entities/User";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { resendVerificationEmail } from "@/actions/user";
import { Button } from "./ui/button";

export const VerificacionEmailAlert = ({ user }: { user: User }) => {
    //Usuario que no ha verificado pero ya tiene email, significa que no ha verificado

    // Esta comprobacion no esta bien

    if (!user.isVerified&&user.email) {
        const userI = {
            id: user.id,
            email: user.email
        }
        return (
            <Alert className="bg-yellow/10 border-accent">
               <AlertCircle className="h-4 w-4" />
                <AlertTitle>Correo no verificado</AlertTitle>
                <AlertDescription>
                    Haz click abajo para verificar tu correo.

                    <Button className="align-end" onSubmit={async()=>{
                        const {updatedUser,sendedMail} =await resendVerificationEmail(userI)
                    }} variant={"outline"}>Recibir un correo de validación</Button>
                </AlertDescription>
            </Alert>
        );
    }
    
    return null;
};