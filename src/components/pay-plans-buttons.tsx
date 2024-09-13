// import { UserModel } from "@/models/user-role-schema";
import { Button } from "./ui/button"
import { userInCookies } from "@/actions/user";
import { CConectButton } from "./custom-connect-button";
import { RoleType } from "@/core/domain/entities/Role";
import Link from "next/link";
import UserFormDialog from "./user-form-dialog";


async function generatePaymentLink(userId: string, planType: 'STUDENT' | 'STUDENT_P') {

    // Genera un identificador único para este intento de pago

  
    // Define los enlaces base de Stripe (reemplaza con tus enlaces reales)
    const stripeLinks = {
      // STUDENT_P: 'https://buy.stripe.com/test_9AQbMo4375ftfqU5kp',
      // STUDENT: 'https://buy.stripe.com/test_9AQ17K9nr6jxfqUbIM'
      STUDENT: "https://buy.stripe.com/test_9AQdUw0QVdLZ3Ic14a",
      STUDENT_P: "https://buy.stripe.com/test_fZe17K2Z3dLZ2E8aEL"
    };
  
    // Añade el paymentId como parámetro de consulta al enlace
    const paymentLink = `${stripeLinks[planType]}?client_reference_id=${userId}`;
  
    return paymentLink;
  }

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
      const link = await generatePaymentLink(user.id,"STUDENT") 
        return (
        <Button className="w-full" ><Link href={link}>Probar gratis</Link></Button>
    )}
    if(user.role===RoleType.STUDENT) 
        return (
        <Button className="w-full" disabled variant={"secondary"}>Tu plan actual</Button>
    )
    const link = await generatePaymentLink(user.id,"STUDENT") 
    return <Button className="w-full" variant={"secondary"}><Link href={link}>Primer mes gratis</Link></Button>
  }
  export async function PremiumPlainButton(){
    const user = await userInCookies()
    if(!user) return(
        <Button className="w-full">Inicia session</Button>
    )
    if(user.roleId===null||user.role===RoleType.STUDENT) {
        const link = await generatePaymentLink(user.id,"STUDENT_P") 

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