"use client"

import CConnectButton from "../main/custom-connect-button";
import GiveAdminButton from "./give-admin-button";

const AdminUsersTable = ({users}) =>{
    return(
        <section className="h-dvh flex flex-col justify-center items-center">
            {users.find(user => user.solicitudAdmin === true)
                ? users.filter(user => user.solicitudAdmin === true).map(user => (
                    <article key={user._id}>
                        <p>{user.address}</p>
                        {user?.nick && <p>{user.nick}</p>}
                        <GiveAdminButton  address={ user.address} /> 
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