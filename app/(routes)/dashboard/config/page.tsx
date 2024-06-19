// import { isLoggedIn } from "@/actions/auth";
// import UserConfigForm from "@/components/routes/user-config-form";
// import { fetchAdmins, fetchUsers } from "@/data/fetch";
// import { flattenAdmin } from "@/utils/auth";
// import { flattenUsers } from "@/utils/users";
// import { redirect } from "next/navigation";


// const UserConfigPage = async( ) =>{
//     const admins = await fetchAdmins();
//     const allAdmins = flattenAdmin(admins);
//     const users = await fetchUsers()
//     const allUsers = flattenUsers(users)
//     // Ruta protegida para logeados solo
//     if (!(await isLoggedIn())) {
//         redirect("/dashboard");
//       }else {
//         return (
//             <>
//             <p className="mt-36">Hola!</p>
//             <h1>Estas en la pagina de configuración del usuario</h1>
//             <UserConfigForm admins={allAdmins} users={allUsers}/>
//             </>
//         )
//       }
// }

// export default UserConfigPage;

import { isLoggedIn } from "@/actions/auth";
import UserConfigForm from "@/components/routes/user-config-form";
import { fetchAdmins, fetchUsers } from "@/data/fetch";
import { flattenAdmin } from "@/utils/auth";
import { flattenUsers } from "@/utils/users";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "User Config Page",
        description: "Configure your user settings",
    };
}

const UserConfigPage = async () => {
    // Ruta protegida para logeados solo

    if (!(await isLoggedIn())) {
        redirect("/dashboard");
        
    }

    const admins = await fetchAdmins();
    const allAdmins = flattenAdmin(admins);
    const users = await fetchUsers();
    const allUsers = flattenUsers(users);

    return (
        <>
            <p className="mt-36">Hola!</p>
            <h1>Estas en la pagina de configuración del usuario</h1>
            <UserConfigForm admins={allAdmins} users={allUsers} />
        </>
    );
};

export default UserConfigPage;
