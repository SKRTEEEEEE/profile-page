import { dataPortfolio } from "@/data";
import Link from "next/link";

export default function ProjectsPage() {
    
    return (
        <main className="w-dvw flex flex-col items-center justify-center">
        <h1 className="">Mis proyectos de muestra:</h1>
        <ul className="w-10/12 flex flex-col gap-4">
        {
            dataPortfolio.map((data)=> (
                <li className="flex justify-between " key={data.id}>
                    <h2>{data.title}</h2>
                    <Link href={`projects/${data.id}`}>Ir<span className="hidden sm:inline"> al proyecto</span>➡️</Link>
                </li>
            ))
        }</ul>
        </main>
    )
  }