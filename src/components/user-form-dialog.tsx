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
import { User } from "@/core/domain/entities/User";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "./ui/label";
import { updateImg, uploadImg } from "@/actions/img";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Link from "next/link";
import { RoleType } from "@/core/domain/entities/Role";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { UserCog } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "./ui/separator";
import DeleteUserButton from "./delete-user-button";
const roleEnum = z.enum([RoleType.ADMIN, RoleType.STUDENT, RoleType.STUDENT_PRO]);

const formSchema = z.object({
  nick: z.string().min(5,{message:"⚠️ Debe tener 5 caracteres como mínimo."}).max(25,{message:"⚠️ Debe tener 25 caracteres como máximo."}).optional(),
  solicitud: z.union([roleEnum,z.null() ],{message:"Debes marcar una de las posibilidades"}).default(null),
  img: z.string().nullable().default(null),
  email: z.string().email({ message: "El email debe ser válido" }).optional(), // Cambia a string y establece un valor por defecto

}).refine(data => {
  // Si el email no está presente, la solicitud debe ser null
  if (!data.email) {
    return data.solicitud === null;
  }
  return true; // Si hay email, no hay restricciones sobre la solicitud
}, {
  message: "Si no proporcionas un email, la solicitud debe ser: 'Sin privilegios'",
  path: ["solicitud"], // Indica que el error se refiere al campo 'solicitud'
});

export default function UserFormDialog({ user }: { user: User | false | null }) {
  const account = useActiveAccount()
  const [previewImage, setPreviewImage] = useState<string | null>(user ? user.img : null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUser, setIsUser] = useState<boolean>(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nick: "",
      solicitud: null,
      img: null,
      email: undefined,
    },
  });
  useEffect(() => {
    // Actualiza los valores del formulario cuando cambia el usuario
    form.reset({
      nick: user ? user.nick : "",
      solicitud: user ? user.solicitud : null,
      img: user ? user.img : null,
      email: user ? user.email || undefined : undefined,
    });
    setPreviewImage(user ? user.img : null);
    setSelectedFile(null);
    setIsUser(user?true:false)
  }, [user, account]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  }

  const setData = async () => {
    if (!selectedFile || !user) return

    try {
      const formData = new FormData();
      formData.append('img', selectedFile);

      let imageUrl: string;
      if (user.img) {
        imageUrl = await updateImg(formData, user.img);
      } else {
        imageUrl = await uploadImg(formData);
      }
      form.setValue("img", imageUrl)
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  }
  
  async function onSubmit(formData: z.infer<typeof formSchema>) {
    if (!account || !user) {
      console.error("Please connect your wallet or log in")
      return
    }

    if (selectedFile !== null) await setData()

    const payload = await generatePayload({address: account.address})
    const signatureRes = await signLoginPayload({account, payload})
    const updatedData = {
      ...formData,
      email: (typeof formData.email ===  "string")? formData.email: null,
      img: form.getValues().img
    };
  
    const res = await updateUser(user.id, signatureRes, updatedData);
    console.log("res: ", res)
  }

  const isFormDisabled = !user

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button className="px-2" variant={"outline"}>
        <UserCog width={20} height={20}/>
        <span className="inline-block sm:hidden px-2">Configuración</span>
        <p className="sr-only">Configuración usuario</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
      <DialogHeader>
        <DialogTitle>
          Editar perfil
        </DialogTitle>
        <DialogDescription>
          Editar tu información como usuario
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="nick"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nick</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="👾 De 5 a 25 caracteres" disabled={isFormDisabled} />
                </FormControl>
                <FormDescription>Este será tu nombre público.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                <Input {...field}  placeholder="ejemplo@correo.com" disabled={isFormDisabled} />
                </FormControl>
                <FormDescription>Email para verificación.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
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
                  {/* <SelectItem value="m@example.com">m@example.com</SelectItem> */}
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
          />
          
          {previewImage && (
            <div className="flex w-full">
              <Image src={previewImage} alt="Imagen de perfil" width={100} height={100} className="rounded-xl border-border" />
              <Button className="mx-auto" onClick={() => setPreviewImage(null)} disabled={isFormDisabled}>Modificar imagen</Button>
            </div>
          )}
          
          {!previewImage && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" onChange={handleFileChange} disabled={isFormDisabled} />
            </div>
          )}
          <DialogFooter className="flex">
            <div className="flex">
          <Button
            type="submit"
            disabled={isFormDisabled || !account}
            variant={"ghost"}
          >
            {isFormDisabled ? "Please Log In to Update Profile" : "Update Profile"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose></div>
          
          </DialogFooter>
        </form>
      </Form>
      <Separator className="my-2"/>
      {isUser&&<DeleteUserButton id={user.id} address={user.address}/>}
      </DialogContent>

    </Dialog>
  )
}