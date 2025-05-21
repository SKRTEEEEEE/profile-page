  "use server"

import { TechForm } from "@/core/domain/entities/tech";
import { cookies } from "next/headers";

export async function createTechTest(params: TechForm) {

    const jwt = (await cookies()).get("jwt");
    const res = await fetch("http://localhost:3001/tech", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt?.value}`
        },
        body: JSON.stringify(params)
    });
    return res.json();
}