import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { MainNav } from "./main-nav";
import ModeToggle from "./mode-toggle";
import { userInCookies } from "@/actions/user";
import UserFormDialog from "./user-form-dialog";
import { CConectButton } from "../oth/custom-connect-button";
import { DataSiteConfig } from "@/lib/types";


export async function SiteHeader({dataSiteConfig}: {dataSiteConfig: DataSiteConfig}){
    const user = await userInCookies()
    return <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 background-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
            <MainNav dataSiteConfig={dataSiteConfig}/>
            <div className="flex flex-1 items-center justify-end space-x-2">
                <nav className="flex items-center">
                    {/* Icons part */}

                    {
                        dataSiteConfig.icons.map(item => {
                            return (
                                <Link key={item.title} href={item.path} target={item.blank?"_blank":"_self"} rel="noreferrer">
                                    <div className={cn(buttonVariants({variant: "ghost"}),"w-10 px-0 hidden sm:inline-flex")}>
                                        {item.render}
                                    </div>
                                    </Link>
                            )
                        })
                    }
                    <span className="sm:inline-block hidden mx-4">
                    <CConectButton/>
                     </span>
                    
                    <span className="hidden sm:inline-block">
                    <UserFormDialog user={user}/></span>
                    

                    <ModeToggle/>
                    <MobileNav dataSiteConfig={dataSiteConfig} user={user}/> 
                </nav>

            </div>
        </div>
    </header>
}