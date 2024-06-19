"use client"

import { publicarUser, updateUser } from "@/actions/user";
import { IUserBdd } from "@/types";
import { Button, Input, Spinner, Switch } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
// import CConnectButton from "../main/custom-connect-button";
import useIsAdmin from "@/hooks/useIsAdmin";
import { IFlattenUsers } from "@/utils/users";
import { FlattenedAdmin } from "@/utils/auth";
import Link from "next/link";

interface UserConfigFormProps {
  users?: IFlattenUsers[];
  admins: FlattenedAdmin[];
}

const UserConfigForm: React.FC<UserConfigFormProps> = ({ users, admins }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)
  const [solicitarIsAdmin, setSolicitarIsAdmin] = useState<boolean>(false);
  const [noIsAdmin, setNoIsAdmin] = useState<boolean>(false);

  const { isAdmin, account } = useIsAdmin(admins);

  const [user, setUser] = useState<IFlattenUsers | undefined>(undefined);

  useEffect(() => {
    if (account?.address && users) {
      setIsLoading(true);
      const foundUser = users.find(user => user.address === account.address);
      console.log("foundUser user-config: ", foundUser)
      setUser(foundUser);
      setIsLoading(false);
    }
  }, [account, users]);

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
      const transData: IUserBdd = {
        nick: data.nick,
        address: account?.address || "",
        isAdmin: isAdminParsed,
        solicitudAdmin: !isAdmin ? solicitarIsAdmin : false,
      };
      let response;
      if(user===undefined){
          response = await publicarUser(transData);
      } else {
        response = await updateUser(transData)
      }
      
      if (response.success) {
        alert(`¡Felicidades! ${response.message}`);
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

  // if (!user) {
  //   return null;
  // }

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