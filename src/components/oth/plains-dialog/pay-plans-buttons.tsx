// import { UserModel } from "@/models/user-role-schema";
import { Button } from "../../ui/button"
import { userInCookies } from "@/actions/user";
import { CConectButton } from "../custom-connect-button";
import { RoleType } from "@/core/domain/entities/Role";
import Link from "next/link";
import UserFormDialog from "../../site-header/user-form-dialog";
import { generatePaymentLink } from "@/lib/utils";




export async function FreePlainButton(){
    const user = await userInCookies()
    if(!user) return(
      <CConectButton connectButtonLabel="Comenzar gratis"/>
    )
    if(user.email===null) return (
        <UserFormDialog 
        user={user} 
        formButtonLabel={
            <>Configura tu correo para empezar</>
        }
        buttonLabelClass="w-full"
        buttonLabelVariant={"default"}
    />
    )
    if(user.isVerified===false) return (
        <Button className="w-full">Debes verificar tu correo</Button>
    )
    if(user.roleId===null) return (
        <Button className="w-full" disabled variant={"secondary"}>Tu plan actual</Button>
    )
    return <Button className="w-full" disabled variant={"outline"}>Incluido en tu plan</Button>
  }
  export async function BasePlainButton(){
    const user = await userInCookies()
    if(!user) return(
        <Button className="w-full">Inicia session</Button>
    )
    if(user.roleId===null){
      const link = generatePaymentLink(user.id,"STUDENT") 
        return (
        <Button className="w-full" ><Link href={link}>Probar gratis</Link></Button>
    )}
    if(user.role===RoleType.STUDENT) 
        return (
        <Button className="w-full" disabled variant={"secondary"}>Tu plan actual</Button>
    )
    const link = generatePaymentLink(user.id,"STUDENT") 
    console.log("user.role: ", user.role)
    return <Button className="w-full" variant={"secondary"}><Link href={link}>
      {user.role===RoleType.STUDENT_PRO?"Cambiar plan":"Primer mes gratis"}
      </Link></Button>
  }
  export async function PremiumPlainButton(){
    const user = await userInCookies()
    if(!user) return(
        <Button className="w-full">Inicia session</Button>
    )
    if(user.roleId===null||user.role===RoleType.STUDENT) {
        const link = generatePaymentLink(user.id,"STUDENT_P") 

        return (
        <Button className="w-full" ><Link href={link}>{user.roleId?"Incrementar plan":"Obtener premium"}</Link></Button>
    )}
    // if(user.role===RoleType.STUDENT) return (
    //     <Button className="w-full" >Incrementar plan</Button>
    // )
    if(user.role===RoleType.STUDENT_PRO)return (
        <Button className="w-full" disabled variant={"secondary"}>Tu plan actual</Button>
    )
    return <Button className="w-full" disabled variant={"outline"}>Incluido en tu plan</Button>
  }