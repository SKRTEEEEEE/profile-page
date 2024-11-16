import { CConectButton } from "../oth/custom-connect-button";
import GiveRoleButton from "./give-role-button";
import { userInCookiesUC } from "@/core/interface-adapters/controllers/user";
import { listUsersUC } from "@/core/application/usecases/entities/user";

export default async function UsersTable() {
  const activeUser = await userInCookiesUC()
  const users = await listUsersUC();


  return (
    <div className="p-6 bg-background/30 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Users</h2>
      <CConectButton/>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-background/30 border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr >
              <th
                scope="col"
                className="px-2 xl:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Dirección
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
                Roles
              </th>
              {/* <th
                scope="col"
                className="px-2 xl:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Solicita Admin
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-background/50 divide-y divide-gray-200">
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
                  <GiveRoleButton solicitud={user.solicitud} id={user.id} role={user.role} userIsAdmin={activeUser&&(activeUser.role==="ADMIN")?true:false}/>
                </td>
                {/* <td className="px-2 xl:px-6 py-4 whitespace-nowrap">
                  <EditRoleSelect id={user.id} />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
