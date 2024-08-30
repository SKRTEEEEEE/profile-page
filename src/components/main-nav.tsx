"use client"

import Link from "next/link"
import { Icons } from "./icons"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { CConectButton } from "./custom-connect-button"

export function MainNav() {
    const pathname = usePathname()
    return <nav className="flex items-center space-x-4 lg:space-x-6">
        
        <Link href="/" className="flex items-center">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <span className="sm:inline-block hidden mr-6">
        <CConectButton/>
        </span>
        <Link href="/academia/ejercicios" className={cn("text-sm font-medium transition-color hover:text-primary hidden sm:inline-block", pathname === "/blog" ? "text-foreground" : "text-foreground/60")}>Ejercicios</Link>
        {/* <Link href="/about" className={cn("text-sm font-medium transition-color hover:text-primary hidden sm:inline-block", pathname === "/about" ? "text-foreground" : "text-foreground/60")}>About</Link> */}
    </nav>
}