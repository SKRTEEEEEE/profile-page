
// import DeleteTechButton from "@/components/routes/delete-admin-tech-button";
// import AdminTechTable from "@/components/routes/admin-tech-table"
import { fetchUsers } from "@/data/fetch"
import AdminUsersTable from "@/components/routes/admin-users-table";
// import { useState } from "react";

const TechsAdminPage = async () => {
    // const [error, setError] = useState<string | null>(null);
    const users = await fetchUsers()
    console.log("users client: ", users)


    return (
        <AdminUsersTable users={users}/>
    )
}

export default TechsAdminPage
