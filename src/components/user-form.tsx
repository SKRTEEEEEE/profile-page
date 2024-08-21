/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G5HGXlOOEm4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { createUser, updateUser } from "@/actions/user-role";



export default function UserForm({ id }: { id?: string }) {
  let updateUserWithId
  if (typeof id === "string") {
    updateUserWithId = updateUser.bind(null, id)
  }

  return (


    <div>
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <form action={id ? updateUserWithId : createUser} className="flex h-20 items-center space-x-4">
        <div className="flex space-x-10 h-20 items-center">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"

            className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-4 border border-transparent hover:border-gray-800  text-sm font-medium rounded-md shadow-sm shadow-gray-300 hover:shadow-lg text-gray-500 bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Create User
        </button>
      </form>
    </div>


  )
}