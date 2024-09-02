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
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { UserCog } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "./ui/separator";
import DeleteUserButton from "./delete-user-button";
import { VerificacionEmailAlert } from "./verificacion-email-alert";
import SolicitudRoleButton from "./solicitud-role";

const formSchema = z.object({
  nick: z.string().min(5, { message: "⚠️ Debe tener 5 caracteres como mínimo." }).max(25, { message: "⚠️ Debe tener 25 caracteres como máximo." }).optional(),
  img: z.string().nullable().default(null),
  email: z.string().email({ message: "El email debe ser válido" }).optional(), // Cambia a string y establece un valor por defecto

})
// .refine(data => {
//   // Si el email no está presente, la solicitud debe ser null
//   if (!data.email) {
//     return data.solicitud === null;
//   }
//   return true; // Si hay email, no hay restricciones sobre la solicitud
// }, {
//   message: "Si no proporcionas un email, la solicitud debe ser: 'Sin privilegios'",
//   path: ["solicitud"], // Indica que el error se refiere al campo 'solicitud'
// });

export default function UserFormDialog({ user }: { user: User | false | null }) {
  const account = useActiveAccount()
  const [previewImage, setPreviewImage] = useState<string | null>(user ? user.img : null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUser, setIsUser] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nick: "",
      img: null,
      email: undefined,
    },
  });
  useEffect(() => {
    // Actualiza los valores del formulario cuando cambia el usuario
    form.reset({
      nick: user ? user.nick : "",
      img: user ? user.img : null,
      email: user ? user.email || undefined : undefined,
    });
    setPreviewImage(user ? user.img : null);
    setSelectedFile(null);
    setIsUser(user ? true : false)
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

    const payload = await generatePayload({ address: account.address })
    const signatureRes = await signLoginPayload({ account, payload })
    const updatedData = {
      ...formData,
      email: (typeof formData.email === "string") ? formData.email : null,
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
          <UserCog width={20} height={20} />
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
              render={({ field }) => (
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ejemplo@correo.com" disabled={isFormDisabled} />
                  </FormControl>
                  <FormDescription>Email para verificación.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Imagen Perfil</Label>
              {previewImage && (
                <div className="flex items-center justify-between sm:w-[400px]">
                  <Image src={previewImage} id="picture" alt="Imagen de perfil" width={60} height={60} className="rounded-xl border-border border-2" />
                  <Button variant={"secondary"} className="my-auto" onClick={() => setPreviewImage(null)} disabled={isFormDisabled}>Modificar imagen</Button>
                </div>
              )}

              {!previewImage && (


                <Input id="picture" type="file" placeholder="Click para cargar una imagen" onChange={handleFileChange} disabled={isFormDisabled} />

              )} </div>
            <DialogFooter>

              <div className="flex w-full gap-4 flex-col">
                <div className="flex justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cerrar
                    </Button>
                  </DialogClose></div>

                <Button
                  type="submit"
                  disabled={isFormDisabled || !account}
                  className="w-full"

                >
                  {isFormDisabled ? "Please Log In to Update Profile" : "Update Profile"}
                </Button></div>

            </DialogFooter>
          </form>
        </Form>
        <Separator className="my-2" />
        {isUser && user && (user.email && <VerificacionEmailAlert user={user} />)}
        <div className="grid grid-cols-2 gap-4">
          <div>
            {isUser && user && !user.solicitud && user.email && user.role === null && user.verifyToken=== undefined&& (
              <SolicitudRoleButton id={user.id} />
            )}
          </div>
          {isUser && user && <DeleteUserButton id={user.id} address={user.address} />}
        </div>
      </DialogContent>

    </Dialog>
  )
}