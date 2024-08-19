/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G5HGXlOOEm4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { createUser, updateUser } from "@/actions/user-actions";



export default function UserForm({ id }: { id?: string }) {
  let updateUserWithId
  if (typeof id === "string") {
    updateUserWithId = updateUser.bind(null, id)
  }

  return (


    <div>
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <form action={id ? updateUserWithId : createUser} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"

            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Create User
        </button>
      </form>
    </div>


  )
}