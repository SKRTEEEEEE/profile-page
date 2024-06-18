import UserConfigForm from "@/components/routes/user-config-form";
import { fetchAdmins } from "@/data/fetch";
import { flattenAdmin } from "@/utils/auth";


const UserConfigPage = async( ) =>{
    const admins = await fetchAdmins();
    const allAdmins = flattenAdmin(admins);
    
    return (
        <>
        <p className="mt-36">Hola!</p>
        <h1>Estas en la pagina de configuración del usuario</h1>
        <UserConfigForm admins={allAdmins}/>
        </>
    )
}

export default UserConfigPage;