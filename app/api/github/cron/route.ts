import { testPeticionRepos } from "@/actions"
import { NextResponse } from "next/server"


//Falta configurar el secret del cron para que no cualquiera accediendo a la ruta active la función
export async function GET() {
    const result = "Hello, World! This is CRON route."
    await testPeticionRepos()

    

    return NextResponse.json({ data: result })

}