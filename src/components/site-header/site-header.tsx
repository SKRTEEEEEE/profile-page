import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { Icons } from "../icons";
import { MainNav } from "../main-nav";
import ModeToggle from "../mode-toggle";
import { userInCookies } from "@/actions/user";
import UserFormDialog from "./user-form-dialog";
import { CConectButton } from "../custom-connect-button";

export async function SiteHeader(){
    const user = await userInCookies()
    return <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 background-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
            <MainNav />
            <div className="flex flex-1 items-center justify-end space-x-2">
                <nav className="flex items-center">
                    <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                    <div className={cn(buttonVariants({variant: "ghost"}),"w-10 px-0 hidden sm:inline-flex")}>
                        <Icons.gitHub className="h-4 w-4"/>
                        <span className="sr-only">GitHub</span>
                    </div>
                    </Link>
                    <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                    <div className={cn(buttonVariants({variant: "ghost"}),"w-10 px-0 hidden sm:inline-flex")}>
                        <Icons.twitter className="h-4 w-4"/>
                        <span className="sr-only">Twitter</span>
                    </div>
                    </Link>
                    <span className="sm:inline-block hidden mx-4">
                    <CConectButton/>
                     </span>
                    
                    <span className="hidden sm:inline-block">
                    <UserFormDialog user={user}/></span>
                    

                    <ModeToggle/>
                    <MobileNav user={user}/> 
                </nav>

            </div>
        </div>
    </header>
}