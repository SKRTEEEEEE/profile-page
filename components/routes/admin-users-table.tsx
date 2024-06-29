"use client"

import { FlattenAdmin, FlattenUsers } from "@/utils/utils.types";
import CConnectButton from "../main/custom-connect-button";
import GiveAdminButton from "./give-admin-button";

type AdminUsersTableProps = {
    users: FlattenUsers[],
    admins: FlattenAdmin[];

  }

const AdminUsersTable:React.FC<AdminUsersTableProps> = ({users, admins}) =>{
    return(
        <section className="h-dvh flex flex-col justify-center items-center">
            {users.find(user => user.solicitudAdmin === true)
                ? users.filter(user => user.solicitudAdmin === true).map(user => (
                    <article key={user.address}>
                        <p>{user.address}</p>
                        {user?.nick && <p>{user.nick}</p>}
                        <GiveAdminButton  address={ user.address} admins={admins}/> 
                    </article>
                ))
                : <p>No hay usuarios con solicitud de admin activa</p>
            }
            {/* <p>{error&&error}</p> */}
            <CConnectButton/>
            

        </section>
    )
}

export default AdminUsersTable;