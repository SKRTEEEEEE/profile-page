import { listUsers } from "@/actions/user-role";
import MakeAdminButton from "./make-admin-button";
import { CConectButton } from "./custom-connect-button";
import { UserInCookies } from "@/core/application/services/user";
import { userRepository } from "@/core/infrastructure/repositories/mongoose-user-repository";
import { authRepository } from "@/core/infrastructure/repositories/thirdweb-auth-repository";
import EditRoleSelect from "./edit-role-select";

export default async function UsersTableTest() {
  const getActiveUser = new UserInCookies(userRepository,authRepository)
  const activeUser = await getActiveUser.execute()
  const users = await listUsers();

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Users</h2>
      <CConectButton/>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr >
              <th
                scope="col"
                className="px-2 xl:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Address
              </th>
              {/* <th
                scope="col"
                className="px-2 xl:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Edit
              </th> */}
              <th
                scope="col"
                className="px-2 xl:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Solicita Administrador
              </th>
              <th
                scope="col"
                className="px-2 xl:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Solicita Admin
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-2 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.address}
                </td>
                {/*<td className="px-2 xl:px-6 py-4 whitespace-nowrap">
                   <Link
                    href={`/${user.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </Link> 
                </td>*/}
                <td className="px-2 xl:px-6 py-4 whitespace-nowrap">
                  <MakeAdminButton solicitudAdmin={user.solicitudAdmin} id={user.id} userIsAdmin={activeUser?activeUser.isAdmin:false}/>
                </td>
                <td className="px-2 xl:px-6 py-4 whitespace-nowrap">
                  <EditRoleSelect id={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
