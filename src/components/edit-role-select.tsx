/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G5HGXlOOEm4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { assignRole, listUserById, updateRole } from "@/actions/user-actions";



export default async function EditRoleSelect({id}: {id:string}) {
const user = await listUserById(id)
//
 const assingRoleWithId = assignRole.bind(null,id)
 const updateRoleWithId = updateRole.bind(null,id)
  return(
        <form action={user?.roleId ? updateRoleWithId : assingRoleWithId}>
        <div>
            <label htmlFor="rolePermission" className="block font-medium text-gray-700">Role Permission</label>
            <select id="role" name="rolePermission">
                <option value="null">User</option>
                <option value="ADMIN">Admin</option>
                <option value="STUDENT">Student</option>
                <option value="STUDENT_PRO">Student pro</option>
            </select>
        </div>
        <button type="submit">Save type</button>
        
        </form>)
        
        
    

}


