"use client"

import { publicarUser } from "@/actions/user";
import { client } from "@/app/client";
import { IUserBdd } from "@/types";
import { useIsAdmin } from "@/utils/isAdmin";
import { Button, Input, Spinner, Switch } from "@nextui-org/react";
import { useState } from "react";
import { ConnectButton } from "thirdweb/react";

//Falta hacer el isUpdate
const UserConfigForm: React.FC = ()=>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isAdmin, account } = useIsAdmin();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsLoading(true);


        try {
        const formData = new FormData(e.currentTarget);
        const data: any = Object.fromEntries(formData.entries());
        const isAdminParsed = isAdmin ? !data.noIsAdmin : false
        const transData:IUserBdd = {
            nick: data.nick,
            address: account?.address || "",
            isAdmin: isAdminParsed,
            //isAdmin?true:false, //Llamar a la función isAdmin, por si el usuario que hace el Edit es ya admin, sino por default false.
            solicitudAdmin: !isAdmin ? data.solicitarIsAdmin : false ,
        }
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
        <Switch name="noIsAdmin" defaultSelected={false}>Dejar de ser Admin</Switch>:<Switch name="solicitarIsAdmin" defaultSelected={false}>Solicitar permisos de "Admin"</Switch>
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
        <ConnectButton client={client}/>
        </form>
    )
}

export default UserConfigForm;