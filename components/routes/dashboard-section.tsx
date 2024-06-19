"use client"

import Link from "next/link";
import CConnectButton from "../main/custom-connect-button";
import { useActiveAccount } from "thirdweb/react";

const DashboardSection = ()=>{
    const account = useActiveAccount();
    return(
        <>
        <p className="mt-24">Hola mundo!</p>
        <br />
        <CConnectButton />
        <br />
        <h1>Estas en el dashboard</h1>
        {account && <Link href="/dashboard/config">Configurar mi perfil</Link>}
        </>
    )
}

export default DashboardSection;
