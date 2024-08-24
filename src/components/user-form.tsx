"use client"
import { updateUser } from "@/actions/user-role";
import { Button } from "./ui/button";
import { useActiveAccount } from "thirdweb/react";
import { signLoginPayload } from "thirdweb/auth";
import { generatePayload } from "@/actions/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { User } from "@/core/domain/entities/User";

const formSchema = z.object({
  nick: z.string().min(5,{message:"⚠️ Debe tener 5 caracteres como mínimo."}).max(25,{message:"⚠️ Debe tener 25 caracteres como máximo."}),
  solicitudAdmin: z.boolean().default(false)
})

export default function UserForm({ user }: { user: User }) {
  const account =  useActiveAccount()



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nick: user.nick,
      solicitudAdmin: user.solicitudAdmin,
    }
  })
  

  

  
  async function onSubmit(formData: z.infer<typeof formSchema>) {
    if(!account){
      throw new Error("Please connect your wallet")
    }

    const payload = await generatePayload({address: account.address})
    const signatureRes = await signLoginPayload({account, payload})
    const res = await updateUser(user.id,signatureRes,formData)
    console.log("res: ",res)
  }
  // function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   // Crear un objeto FormData a partir del formulario
  //   const formData = new FormData(event.currentTarget);

  //   // Pasar formData a la función handleClick
  //   handleClick(formData);
  // }

  return (
    <div>
      
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-20 items-center space-x-4">
        <FormField control={form.control} name="nick" render={({field})=> (
          <FormItem>
            <FormLabel>Nick</FormLabel>
              <FormControl>
                <Input defaultValue={field.value} placeholder={`👾 De 5 a 25 caracteres`} {...field} />
              </FormControl>
              <FormDescription>
                Este es tu nombre publico disponible.
              </FormDescription>
              <FormMessage />
          </FormItem>
        )}>
          {/* <label htmlFor="name" className="block font-medium text-gray-700">
            Nick
          </label>
          <input
            type="text"
            id="nick"
            name="nick"

            className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          /> */}
        </FormField>
        <FormField control={form.control} name="solicitudAdmin" render={({field})=>(
          <FormItem>
            <FormLabel>Solicitar Admin</FormLabel>
            <FormControl>
              <Checkbox checked={field.value}
                  onCheckedChange={field.onChange}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}>

        </FormField>
        {/* <div className="flex space-x-10 h-20 items-center">
          <label htmlFor="solicitarAdmin" className="block font-medium text-gray-700">
            Solicitar Admin
          </label>
          <Checkbox
            
            id="solicitarAdmin"
            name="solicitudAdmin"
            className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div> */}
        <Button
        disabled={!account}
          type="submit"
          
        >
          Update Profile
        </Button>
      </form>
      </Form>
    </div>
  )
}