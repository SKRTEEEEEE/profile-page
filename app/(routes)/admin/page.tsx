import Link from "next/link"


const AdminPage = async( ) =>{
    
    return (
        <>
        <p className="mt-48">Hola mundo!</p>
        <h1>Estas en el admin page</h1>
        <Link href="/admin/techs">Ir a techs</Link>
        <Link href="/admin/users">Ir a users</Link>
        </>
    )
}

export default AdminPage