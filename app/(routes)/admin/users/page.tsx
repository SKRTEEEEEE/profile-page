import { fetchUsers } from "@/data/fetch"
import AdminUsersTable from "@/components/routes/admin-users-table";

const TechsAdminPage = async () => {
    const users = await fetchUsers()
    console.log("users client: ", users)


    return (
        <AdminUsersTable users={users}/>
    )
}

export default TechsAdminPage
