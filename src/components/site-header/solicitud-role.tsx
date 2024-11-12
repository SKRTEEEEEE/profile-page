"use client"

import { RoleType } from "@/core/domain/entities/Role"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import Link from "next/link"
import { updateUserSolicitud } from "@/actions/user"
import { useState } from "react"



{/* <FormField
control={form.control}
name="solicitud"
render={({field}) => (
  <FormItem>
  <FormLabel>Privilegio</FormLabel>
  <Select onValueChange={value => field.onChange(value === "NONE" ? null : value)} defaultValue={ field.value === null ? undefined : field.value }>               
     <FormControl>
      <SelectTrigger> 
        <SelectValue placeholder="Solicita una vez configurado el email" />
      </SelectTrigger>
    </FormControl>
    <SelectContent>
      <SelectItem value="NONE">Sin privilegios</SelectItem>
      <SelectItem value="STUDENT">Alumno</SelectItem>
      <SelectItem value="ADMIN">Admin</SelectItem>
    </SelectContent>
  </Select>
  <FormDescription>
    Configura un email y solicita privilegios, nos pondremos en contacto inmediatamente.{" "}
    <Link href="#">Información aquí.</Link>.
  </FormDescription>
  <FormMessage />
</FormItem>
)}
/> */}

const formSchema = z.object({
    solicitud: z.enum([RoleType.ADMIN,RoleType.PROF_TEST]).nullable()
})

export default function SolicitudRoleButton({id}:{id:string}){
      const [loading, setLoading] = useState(false)
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
          solicitud: null
        }
      })
      const onSubmit = async (formData: z.infer<typeof formSchema>) => {
         const updatedData = {
          ...formData,id
         }
         try {
          setLoading(true)
          await updateUserSolicitud(updatedData)
         } catch (error) {
          console.error("Error at update solicitud rol")
         } finally {
          setLoading(false)
         }
         
      }
      return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" >
                Solicitar rol
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Solicitar Rol</DialogTitle>
                <DialogDescription>
                  Serás comunicado por correo una vez confirmado y configurado. Gracias!
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name="solicitud" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Privilegio</FormLabel>
                        <Select onValueChange={value => field.onChange(value === "NONE" ? null : value)} defaultValue={ field.value === null ? undefined : field.value }>               
                           <FormControl>
                            <SelectTrigger> 
                              <SelectValue placeholder="Selecciona el rol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="NONE">Sin privilegios</SelectItem>
                            <SelectItem value="PROF_TEST">Profesor</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Solicita la configuración del rol acordado con la compañía. <br />
                          <Link href="#">Información aquí.</Link>.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <DialogFooter className="flex">
                    <Button disabled={loading} type="submit">
                        
                        {loading? <>Solicitando</>:<>Solicitar</>}
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
      )
}