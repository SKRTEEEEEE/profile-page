"use client"

import { publicarUser, updateUser } from "@/actions/user";
import { Button, Input, Spinner, Switch } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
// import CConnectButton from "../main/custom-connect-button";
import useIsAdmin from "@/hooks/useIsAdmin";

import Link from "next/link";
import { updateUserAdminStatus } from "@/actions/admin";
import { generatePayload } from "@/actions/auth";
import { signLoginPayload } from "thirdweb/auth";
import { revrd, serverRev } from "@/actions/revrd";
import { UserData } from "@/types/ui";
import { FlattenAdmin, FlattenUsers } from "@/utils/utils.types";

type UserConfigFormProps = {
  users?: FlattenUsers[];
  admins: FlattenAdmin[];
}

const UserConfigForm: React.FC<UserConfigFormProps> = ({ users, admins }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)
  const [solicitarIsAdmin, setSolicitarIsAdmin] = useState<boolean>(false);
  const [noIsAdmin, setNoIsAdmin] = useState<boolean>(false);

  const { isAdmin, account } = useIsAdmin(admins);

  const [user, setUser] = useState<FlattenUsers | undefined>(undefined);

  useEffect(() => {
    if (account?.address && users) {
      // setIsLoading(true);
      const foundUser = users.find(user => user.address === account.address);
      console.log("foundUser user-config: ", foundUser)
      setUser(foundUser);
      if(foundUser)setSolicitarIsAdmin(foundUser.solicitudAdmin)
      setIsLoading(false);
    }
  }, [account]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingButton(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: any = Object.fromEntries(formData.entries());
      console.log("noIsAdmin: ", noIsAdmin)
      console.log("!data.noIsAdmin: ", !noIsAdmin)
      
      const isAdminParsed = isAdmin ? !noIsAdmin : false;
      console.log("isAdminParsed: ", isAdminParsed)
      const transData: UserData = {
        nick: data.nick,
        address: account?.address || "",
        isAdmin: isAdminParsed,
        solicitudAdmin: !isAdmin ? solicitarIsAdmin : false,
      };
      let response;
      if(user===undefined){
          response = await publicarUser(transData);
          console.log("publicar user")
      } else {
        console.log("updateUser, data: ", transData)
        response = await updateUser(transData)
        if(response.success && account){

          //Solo para eliminar de admin
          if(noIsAdmin){
            const payload = await generatePayload({ address: account.address });
            const signatureResult = await signLoginPayload({ account, payload });
            response = await updateUserAdminStatus(signatureResult, !noIsAdmin, account?.address)
          } else {
            response = {success: true, message: "Usuario update en la base de datos"}
          }
          
        } else {
          response = {success: false , message: "Error al actualizar el usuario en el servidor"}
        }
      }
      
      if (response.success) {
        alert(`¡Felicidades! ${response.message}`);
        // await serverRev("/admin/users")
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
    return<p><Spinner size="sm" /> Cargando...</p>;
  }

  return (
      <form onSubmit={handleSubmit}>
        <p>Address: {account?.address}</p>
        <Input
          name="nick"
          type="string"
          label="Nick"
          defaultValue={user?.nick}
          description="Introduce tu nombre de usuario"
          size="sm"
          className="max-w-[120px]"
        />
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
        {account && (
          isLoadingButton ? (
            <p><Spinner size="sm" /> Cargando...</p>
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
