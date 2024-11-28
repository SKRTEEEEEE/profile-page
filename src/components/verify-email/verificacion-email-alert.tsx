"use client"
import { User } from "@/core/domain/entities/User";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { resendVerificationEmail } from "@/actions/user";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

export const VerificacionEmailAlert = ({ user }: { user: User }) => {
    const [loading, setLoading] = useState(false);
    // const [open, setOpen] = useState(false);
    const [lastSent, setLastSent] = useState<number | null>(null);

    // Cargar la fecha del último envío desde localStorage
    useEffect(() => {
        const storedLastSent = localStorage.getItem('lastSent');
        if (storedLastSent) {
            setLastSent(Number(storedLastSent));
        }
    }, []);

    const canShowAlert = () => {
        if (lastSent) {
            const now = Date.now();
            return now - lastSent >= 30 * 60 * 1000; // 30 minutos
        }
        return true; // Si nunca se ha enviado, se puede mostrar
    };

    const showAlert = !user.isVerified && user.email;

    if (showAlert) {
        if (canShowAlert()) {
            const userI = {
                id: user.id,
                email: user.email as string
            };

            const handleResend = async () => {
                setLoading(true);
                try {
                    await resendVerificationEmail(userI);
                    const currentTime = Date.now();
                    setLastSent(currentTime); // Guardar la hora del último envío
                    localStorage.setItem('lastSent', currentTime.toString()); // Guardar en localStorage
                    // setOpen(true); // Mostrar el toast
                } catch (error) {
                    console.error("Error al enviar el correo de verificación:", error);
                } finally {
                    setLoading(false);
                }
            };

            return (
                <>
                    <Alert className="bg-yellow/10 border-accent">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Correo no verificado</AlertTitle>
                        <AlertDescription>
                            Haz click abajo para verificar tu correo.
                            <Button
                                className="align-end"
                                onClick={handleResend}
                                variant={"outline"}
                                disabled={loading}
                            >
                                {loading ? "Enviando..." : "Recibir un correo de validación"}
                            </Button>
                        </AlertDescription>
                    </Alert>
                    {/* NO SE UTILIZA ACTUALMENTE 
                    <Toast.Provider swipeDirection="right">
                        <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
                            <Toast.Title className="ToastTitle">Correo enviado</Toast.Title>
                            <Toast.Description className="ToastDescription">
                                Correo de validación enviado con éxito.
                            </Toast.Description>
                            <Toast.Close aria-label="Cerrar" />
                        </Toast.Root>
                        <Toast.Viewport className="ToastViewport" />
                    </Toast.Provider> */}
                </>
            );
        } else {
            // Mostrar un alert diferente si no ha pasado el tiempo
            return (
                <Alert className="bg-gray/10 border-gray">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Correo de verificación enviado</AlertTitle>
                    <AlertDescription>
                        Por favor, revisa tu bandeja de entrada/spam.
                    </AlertDescription>
                </Alert>
            );
        }
    }

    return null;
};
