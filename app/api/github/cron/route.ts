import { testPeticionRepos } from "@/actions"
// import { NextResponse } from "next/server"


// //Falta configurar el secret del cron para que no cualquiera accediendo a la ruta active la función
// export async function GET() {
//     const result = "Hello, World! This is CRON route."
//     await testPeticionRepos()

    

//     return NextResponse.json({ data: result })

// }
import type { NextRequest } from 'next/server';
 
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
    await testPeticionRepos();
  return Response.json({ success: true });
}