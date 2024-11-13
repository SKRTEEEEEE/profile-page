"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { DataSiteConfig } from "@/lib/types"



export function MainNav({dataSiteConfig}: {dataSiteConfig: DataSiteConfig}) {
    const pathname = usePathname()
    return <nav className="flex items-center space-x-4 lg:space-x-6">
        {/* Logo mas render part */}
        <Link href={dataSiteConfig.logo.path} className="flex items-center">
            {dataSiteConfig.logo.render}
        </Link>
       {/* Paginas part */}
        <Link href={dataSiteConfig.paths[0].path} className={cn("text-sm font-medium transition-color hover:text-primary hidden sm:inline-block", pathname === "/blog" ? "text-foreground" : "text-foreground/60")}>{dataSiteConfig.paths[0].title}</Link>
        {/* <Link href="/about" className={cn("text-sm font-medium transition-color hover:text-primary hidden sm:inline-block", pathname === "/about" ? "text-foreground" : "text-foreground/60")}>About</Link> */}
    </nav>
}