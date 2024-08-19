import { deleteUser } from "@/actions/user-actions";


export default async function DeleteUserButton({id}:{id:string}) {
    return (
        <form action={deleteUser}>
        <input type="text" id="idInput" name="id" className="hidden" value={id} />
        <button type="submit" className="text-red-500 hover:text-red-700">
            Delete
        </button>
        </form>
    )
} 