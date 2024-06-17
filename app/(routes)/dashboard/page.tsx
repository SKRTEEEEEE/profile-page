import Link from "next/link"


const DashboardPage = async( ) =>{
    
    return (
        <>
        <p className="mt-24">Hola mundo!</p>
        <h1>Estas en el dashboard</h1>
        <Link href="/dashboard/config">Configurar mi perfil</Link>
        
        </>
    )
}

export default DashboardPage