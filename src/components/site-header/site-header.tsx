import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { MainNav } from "./main-nav";
import UserFormDialog from "./user-form-dialog";
import { CConectButton } from "../oth/custom-connect-button";
import { DataSiteConfig } from "@/lib/types";
import { userInCookiesUC } from "@/core/interface-adapters/controllers/user";
import ThemePopover from "./theme-popover";

type ThemeType = {
    light: { name: string; color: string }[];
    dark: { name: string; color: string }[];
  };
  
  const themes: ThemeType = {
    light: [
      { name: "grays", color: "bg-zinc-100" },
      { name: "gold", color: "bg-yellow-300" },
      { name: "neon", color: "bg-pink-500" },
      { name: "sky", color: "bg-purple-400" },
      { name: "soft", color: "bg-gray-800" },
    ],
    dark: [
      { name: "grays", color: "bg-zinc-950" },
      { name: "gold", color: "bg-yellow-700" },
      { name: "neon", color: "bg-pink-600" },
      { name: "sky", color: "bg-purple-600" },
      { name: "soft", color: "bg-gray-300" },
    ],
  };
  

export async function SiteHeader({dataSiteConfig}: {dataSiteConfig: DataSiteConfig}){
    const user = await userInCookiesUC()
    return <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 background-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
            <MainNav dataSiteConfig={dataSiteConfig}/>
            <div className="flex flex-1 items-center justify-end space-x-2">
                <nav className="flex items-center gap-2">
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
                    <span className="sm:inline-block hidden ">
                    <CConectButton/>
                     </span>
                    
                    <span className="hidden sm:inline-block ">
                    <UserFormDialog user={user}/></span>
                    

                    <ThemePopover />
                    <MobileNav dataSiteConfig={dataSiteConfig} user={user}/> 
                </nav>

            </div>
        </div>
    </header>
}