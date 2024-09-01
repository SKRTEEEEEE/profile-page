"use client";

import { deleteUser } from "@/actions/user";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { Button } from "./ui/button";
import { generatePayload } from "@/actions/auth";
import { signLoginPayload } from "thirdweb/auth";
import { UserX } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Asegúrate de que esto sea 'zod', no 'velite'
import { zodResolver } from "@hookform/resolvers/zod";

// Definición del esquema de validación
const formSchema = z.object({
    address: z.string(),
    validation: z.string(),
}).refine((data) => data.validation === data.address, {
    message: "El valor de validación debe coincidir con la dirección.",
    path: ['validation'],
});

export default function DeleteUserButton({ id, address }: { id: string; address: string }) {
    const account = useActiveAccount();
    const wallet = useActiveWallet();
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            validation: "",
            address: address,
        }
    });

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!account) {
            throw new Error("Please connect your wallet");
        }
        try {
            const payload = await generatePayload({ address: account.address });
            const signatureRes = await signLoginPayload({ account, payload });
            await deleteUser(signatureRes, id, address);
            if (wallet !== undefined) {
                wallet.disconnect();
            }
        } catch (error) {
            console.error("Error at delete user: " + error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" disabled={!account}>
                    <UserX />
                    Eliminar cuenta
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Eliminar usuario</DialogTitle>
                    <DialogDescription>
                        Acción irreversible, introduce <b>"{address}"</b> para eliminar tu cuenta.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit}>
                        <FormField control={form.control} name="validation" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Verificación</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Introduce aquí tu dirección" />
                                </FormControl>
                                <FormDescription>
                                    Una vez realizada esta acción perderás toda tu información como cursos realizados o privilegios.
                                </FormDescription>
                            </FormItem>
                        )} />
                        <DialogFooter className="flex">
                        <Button variant="destructive" disabled={!account} type="submit">
                            
                            <UserX /> Eliminar
                        </Button>
                        <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose></DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
