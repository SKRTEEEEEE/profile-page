import { getCookiesUC } from "@/core/application/usecases/services/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Wallet } from "ethers";

export async function GET(){
    
    try {
        const jwt = (await cookies()).get("jwt");
        // const client = new ThirdwebClientConfig().client  
        // const account = generateAccount({client})
        const wallet = new Wallet(process.env.THIRDWEB_ADMIN_PRIVATE_KEY as string);
        const publicKey = await wallet.getAddress();
        console.log("jwt", jwt);
        const jwtCookies = await getCookiesUC()
        const res = await fetch("http://localhost:3001/pre-tech?q=typ", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt?.value}`,
            // "Authorization": `Bearer megustajs`,
        },
        })
        const data = await res.json();
        return NextResponse.json({jwt_value: jwt?.value, jwtCookies, publicKey, data})
    } catch (error) {
        console.error("Error in GET /api/test:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    
}