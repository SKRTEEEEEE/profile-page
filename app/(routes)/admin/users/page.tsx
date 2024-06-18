import { fetchAdmins, fetchUsers } from "@/data/fetch"
import AdminUsersTable from "@/components/routes/admin-users-table";
import { flattenUsers } from "@/utils/users";
import { flattenAdmin } from "@/utils/auth";

const TechsAdminPage = async () => {
    const users = await fetchUsers()
    const allUsers = flattenUsers(users)
    const admins = await fetchAdmins();
    const allAdmins = flattenAdmin(admins)

    return (
        <AdminUsersTable users={allUsers} admins={allAdmins}/>
    )
}

export default TechsAdminPage
