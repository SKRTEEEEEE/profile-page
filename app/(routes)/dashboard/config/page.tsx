import { isLoggedIn } from "@/actions/auth";
import UserConfigForm from "@/components/routes/user-config-form";
import { fetchAdmins, fetchUsers } from "@/data/fetch";
import { flattenAdmin } from "@/utils/auth";
import { flattenUsers } from "@/utils/users";
import { redirect } from "next/navigation";


const UserConfigPage = async( ) =>{
    const admins = await fetchAdmins();
    const allAdmins = flattenAdmin(admins);
    const users = await fetchUsers()
    const allUsers = flattenUsers(users)
    // Ruta protegida para logeados solo
    if (!(await isLoggedIn())) {
        redirect("/dashboard");
      }
    
    return (
        <>
        <p className="mt-36">Hola!</p>
        <h1>Estas en la pagina de configuración del usuario</h1>
        <UserConfigForm admins={allAdmins} users={allUsers}/>
        </>
    )
}

export default UserConfigPage;