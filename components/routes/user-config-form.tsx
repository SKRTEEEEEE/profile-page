"use client"

import { publicarUser } from "@/actions/user";
// import { client } from "@/app/client";
import { IUserBdd } from "@/types";
// import { useIsAdmin } from "@/utils/auth";
import { Button, Input, Spinner, Switch } from "@nextui-org/react";
import React, { useState } from "react";
import CConnectButton from "../main/custom-connect-button";
import { FlattenedAdmin } from "@/utils/auth";
import useIsAdmin from "@/hooks/useIsAdmin";

interface UserConfigFormProps {
  admins: FlattenedAdmin[];
}

// - [ ] Falta hacer el isUpdate
const UserConfigForm: React.FC<UserConfigFormProps> =  ({admins})=>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [solicitarIsAdmin, setSolicitarIsAdmin] = React.useState<boolean>(false);
    const [noIsAdmin, setNoIsAdmin] = React.useState<boolean>(false);

    // //SOLO PUEDE ACEPTAR NUEVOS ADMINS EL SUPER-ADMIN :)
    // const { isAdmin, account } = useIsSuperAdmin();
    const {isAdmin, account } = useIsAdmin(admins)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsLoading(true);


        try {
        const formData = new FormData(e.currentTarget);
        const data: any = Object.fromEntries(formData.entries());
        console.log("data: ", data)
        const isAdminParsed = isAdmin ? !data.noIsAdmin : false
        console.log("data SolIsAdmin: ", solicitarIsAdmin);
        console.log("comprobación:", !isAdmin ? solicitarIsAdmin : false  )
        const transData:IUserBdd = {
            nick: data.nick,
            address: account?.address || "",
            isAdmin: isAdminParsed,
            //isAdmin?true:false, //Llamar a la función isAdmin, por si el usuario que hace el Edit es ya admin, sino por default false.
            solicitudAdmin: !isAdmin ? solicitarIsAdmin : false ,
        }
        console.log("transData userConfig: ", transData)
        //Llamar a la función para guardar en la bdd -> await .....
        const response = await publicarUser(transData)
        if (response.success) {
            alert(`¡Felicidades! ${response.message}`);
            

        } else {
            alert(`Oops! ${response.message}`);
        }
        } catch (error) {
            console.error("Error al guardar el usuario :", error)
            alert("Ha habido un error. Intente-lo de nuevo")
        }
        setIsLoading(false)
    }
    return(

        <form onSubmit={handleSubmit}>
        <p>Address: {account?.address}</p>
        <Input name="nick" type="string" label="Nick" description="Introduce tu nombre de usuario" size="sm" className="max-w-[120px]"/>
        {/* Feat-> Cuando el usuario es admin preguntar si quiere dejar de serlo y no mostrar la solicitud */}
        {isAdmin?
        <Switch isSelected={noIsAdmin} onValueChange={setNoIsAdmin}>
        Dejar de ser "Admin"
      </Switch>:<Switch isSelected={solicitarIsAdmin} onValueChange={setSolicitarIsAdmin}>
        Solicitar permisos de "Admin"
      </Switch>
        }
        <br />
        {
            account ? (
                isLoading ? (
                  <p><Spinner size="sm" /> Cargando...</p>
                ) : (
                    
                  <Button type="submit">Actualizar</Button>
                )
              ) : null
            
            }
            <br />
            <CConnectButton/>
        </form>
    )
}

export default UserConfigForm;