import { Button } from "@nextui-org/react"
// import { revalidatePath } from "next/cache";
import Link from "next/link";
// import { redirect } from "next/navigation";
import { FaPlus } from "react-icons/fa"
import { useActiveAccount } from "thirdweb/react";
import CConnectButton from "../main/custom-connect-button";

type TopContentAdminTechTableProps = {
  account: ReturnType<typeof useActiveAccount> | null; // Ajusta el tipo según lo que devuelve useActiveAccount
}

const TopContentAdminTechTable: React.FC<TopContentAdminTechTableProps> = ({account}) =>{
    return(
      <>
      <div className="flex gap-3">
        
        <CConnectButton/>
      <Button className="absolute right-4 bg-foreground text-background" endContent={<FaPlus  />} size="sm">
      <Link href={`techs/new`}>Añadir nueva tecnología</Link>
    </Button>
    </div>
    {!account&&
    <p className="text-sm">Inicia sesión para realizar cambios. <i className="text-xs">Solo usuarios "admin" pueden.</i></p>
    }
    </>
    )
}

export default TopContentAdminTechTable;