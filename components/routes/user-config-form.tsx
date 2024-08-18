"use client"

import { publicarUser, updateFile, updateUser, uploadFile } from "@/actions/user";
import { Button, Input, Spinner, Switch } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { updateUserAdminStatus } from "@/actions/admin";
import { generatePayload, JWTPayload } from "@/actions/auth";
import { signLoginPayload } from "thirdweb/auth";
import { revrd, serverRev } from "@/actions/revrd";
import { UserData } from "@/types/ui";
import { FlattenUsers } from "@/utils/utils.types";
import { useCookies } from "@/utils/auth";
import { useActiveAccount } from "thirdweb/react";

type UserConfigFormProps = {
  users?: FlattenUsers[];
  cookies: JWTPayload;
}

const UserConfigForm: React.FC<UserConfigFormProps> = ({ users, cookies }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)
  const [solicitarIsAdmin, setSolicitarIsAdmin] = useState<boolean>(false);
  const [noIsAdmin, setNoIsAdmin] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {isAdmin, address} = useCookies(cookies)
  const [user, setUser] = useState<FlattenUsers | undefined>(undefined);

  useEffect(() => {
    if (address && users) {
      // setIsLoading(true);
      const foundUser = users.find(user => user.address === address);
      console.log("foundUser user-config: ", foundUser)
      setUser(foundUser);
      if(foundUser?.img){
          setPreviewImage(foundUser.img)
      }
      if (foundUser) setSolicitarIsAdmin(foundUser.solicitudAdmin)
      setIsLoading(false);
    }
  }, [address]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) throw new Error("Error at handle file")
    setSelectedFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingButton(true);

    try {
      if(address===true || address === false)throw new Error("Error with login")
      const formData = new FormData(e.currentTarget);
      if (selectedFile) {
        formData.append('img', selectedFile);
      }  
      // console.log("FormData contents:");
      // formData.forEach((value, key) => {
      //   if (value instanceof File) {
      //     console.log(key, value.name, value.type, value.size);
      //   } else {
      //     console.log(key, value);
      //   }
      // });
      const setData = async (
        formData: FormData,
        fn: (formData: FormData, url?: string) => Promise<string>,
        url?: string,
      ): Promise<UserData> => {
        let imageUrl: string;
        try {
          if(url){
            imageUrl = await fn(formData, url)
          }else{
            imageUrl = await fn(formData);
          }
          
        } catch (error) {
          throw new Error("Error al subir la imagen:" + error);
        }
      
        const data: Record<string, any> = Object.fromEntries(formData.entries());
      
        const isAdminParsed = isAdmin ? !noIsAdmin : false;
      
        const transData: UserData = {
          nick: data.nick,
          address: address,
          isAdmin: isAdminParsed,
          solicitudAdmin: !isAdmin ? solicitarIsAdmin : false,
          img: imageUrl,
        };
      
        console.log("transData: ", transData);
        return transData;
      };
      
      let response;
      if (user === undefined) {
        const transData = await setData(formData, uploadFile)
        response = await publicarUser(transData);
      } else {
        // console.log("updateUser, data: ", transData)
        const transData = await setData(formData, updateFile, user.img)
        response = await updateUser(transData)
        if (response.success && address) {
          //Solo para eliminar de admin
          if (noIsAdmin) {
            const account = useActiveAccount()
            if(!account)throw new Error("Error with account")
            const payload = await generatePayload({ address });
            const signatureResult = await signLoginPayload({ account, payload });
            response = await updateUserAdminStatus(signatureResult, !noIsAdmin, address)
          } else {
            response = { success: true, message: "Usuario update en la base de datos" }
          }

        } else {
          response = { success: false, message: "Error al actualizar el usuario en el servidor" }
        }
      }

      if (response.success) {
        alert(`¡Felicidades! ${response.message}`);
        await serverRev("/admin")
        await revrd("/dashboard");
      } else {
        alert(`Oops! ${response.message}`);
      }
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      alert("Ha habido un error. Intente-lo de nuevo");
    }

    setIsLoadingButton(false);
  };

  if (isLoading) {
    return <p><Spinner size="sm" /> Cargando...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Address: {address}</p>
      <Input
        name="nick"
        type="string"
        label="Nick"
        defaultValue={user?.nick}
        description="Introduce tu nombre de usuario"
        size="sm"
        className="max-w-[120px]"
      />
      {previewImage && (
        <div>
          <img src={previewImage} alt="Vista previa" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          <Button onClick={() => setPreviewImage(null)}>Modificar imagen</Button>
        </div>
      )}
      {//Si foundUser === undefined -> no se ha registrado -> Si, mostrar input
      
      !previewImage && (
        
      <input
        name="img"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        
        
      />
      )}
      {isAdmin ? (
        <Switch isSelected={noIsAdmin} onValueChange={setNoIsAdmin}>
          Dejar de ser "Admin"
        </Switch>
      ) : (
        <Switch isSelected={solicitarIsAdmin} onValueChange={setSolicitarIsAdmin}>
          Solicitar permisos de "Admin"
        </Switch>
      )}
      <br />
      {address && (
        isLoadingButton ? (
          <><Spinner size="sm" />
          <p> Cargando...</p></>
        ) : (
          <Button type="submit">Actualizar</Button>
        )
      )}
      <br />
      <Link href="/dashboard">Volver al dashboard</Link>

    </form>
  );
};

export default UserConfigForm;
