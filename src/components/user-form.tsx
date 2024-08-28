"use client"
import { updateUser } from "@/actions/user";
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
import { useState } from "react";
import Image from "next/image";
import { Label } from "./ui/label";
import { updateImg, uploadImg } from "@/actions/img";

const formSchema = z.object({
  nick: z.string().min(5,{message:"⚠️ Debe tener 5 caracteres como mínimo."}).max(25,{message:"⚠️ Debe tener 25 caracteres como máximo."}),
  solicitudAdmin: z.boolean().default(false),
  img: z.string().nullable().default(null)
})

export default function UserForm({ user }: { user: User }) {
  const account =  useActiveAccount()
  const [previewImage, setPreviewImage] = useState<string | null>(user.img)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nick: user.nick,
      solicitudAdmin: user.solicitudAdmin,
      //Hay que publicar la img previamente y recoger la url
      img: user.img
    }
  })
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) throw new Error("Error at handle file")
    setSelectedFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  }
  const setData = async (
  ) => {
    let imageUrl: string;
    try {
      if(!selectedFile)throw new Error("Error at setSelectedFile")
      // Crear un nuevo objeto FormData
    const formData = new FormData();
    formData.append('img', selectedFile);

    // Si el usuario ya tiene una imagen, usa la función de actualización
    if (user.img && previewImage !== null) {
      // Actualizar imagen existente
      // console.log("updateImg: ",formData)
      imageUrl = await updateImg(formData, user.img);
  } else {
      // Subir una nueva imagen
      // console.log("uploadImg: ", formData)
      imageUrl = await uploadImg(formData);
  }
      form.setValue("img", imageUrl)
    } catch (error) {
      throw new Error("Error al subir la imagen:" + error);
    }
  }
  
  async function onSubmit(formData: z.infer<typeof formSchema>) {
    if(!account){
      throw new Error("Please connect your wallet")
    }
    console.log("formData antes.set: ",formData)
    if(selectedFile!==null) await setData()
    console.log("formData despues.set: ",formData)
  console.log("formData después de setData:", form.getValues())

    const payload = await generatePayload({address: account.address})
    const signatureRes = await signLoginPayload({account, payload})
    const updatedData = {
      ...formData,
      img: form.getValues().img // Asegúrate de que img esté actualizado
  };
  
  const res = await updateUser(user.id, signatureRes, updatedData);
    // const res = await updateUser(user.id,signatureRes,formData)
    console.log("res: ",res)
  }

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
        {
          previewImage &&(
            <div>
              <Image src={previewImage} alt="Imagen de perfil" width={200} height={200} style={{ maxWidth: '200px', maxHeight: '200px' }}/>
              <Button onClick={() => setPreviewImage(null)}>Modificar imagen</Button>
            </div>
          )
        }
        {
          !previewImage && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" onChange={handleFileChange}/>
    </div>

          )
        }

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