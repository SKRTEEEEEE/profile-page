/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G5HGXlOOEm4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { updateUser } from "@/actions/user-role";
import { Button } from "./ui/button";
import { ExtendedJWTPayload } from "@/types/auth";



export default function UserForm({ jwt }: { jwt: ExtendedJWTPayload }) {

  const updateUserWithId = updateUser.bind(null, jwt.ctx.id)


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <form action={updateUserWithId} className="flex h-20 items-center space-x-4">
        <div className="flex space-x-10 h-20 items-center">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Nick
          </label>
          <input
            type="text"
            id="nick"
            name="nick"

            className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div className="flex space-x-10 h-20 items-center">
          <label htmlFor="solicitarAdmin" className="block font-medium text-gray-700">
            Solicitar Admin
          </label>
          <input
            type="checkbox"
            id="solicitarAdmin"
            name="solicitudAdmin"
            className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <Button
          type="submit"
          className="inline-flex items-center px-4 py-4 border border-transparent hover:border-gray-800  text-sm font-medium rounded-md shadow-sm shadow-gray-300 hover:shadow-lg text-gray-500 bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Update Profile
        </Button>
      </form>
    </div>
  )
}