import { client } from "@/app/client";
import { Button } from "@nextui-org/react"
import Link from "next/link";
import { FaPlus } from "react-icons/fa"
import { ConnectButton, useActiveAccount } from "thirdweb/react";

interface TopContentAdminTechTableProps {
  account: ReturnType<typeof useActiveAccount> | null; // Ajusta el tipo según lo que devuelve useActiveAccount
}

const TopContentAdminTechTable: React.FC<TopContentAdminTechTableProps> = ({account}) =>{
  // const account = useActiveAccount()
    return(
      <>
      <div className="flex gap-3">
        <ConnectButton client={client}/>
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