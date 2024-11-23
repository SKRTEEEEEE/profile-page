"use client"


import { itemsNavbar } from "@/lib/data-ceo";

import { MotionTransition } from "../oth/transition-component";
import { Link, usePathname } from "@/i18n/routing";

const Navbar = () => {
    const router = usePathname()
    console.log("router: ", router)

    return (
        <MotionTransition position="right" className="fixed z-40 flex flex-col items-center justify-center w-full mt-auto h-max bottom-10">
            <nav>
                <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-white/15 background-blur-sm">
                    {itemsNavbar.map((item) => (
                        <div
                            key={item.id}
                            className={`px-3 py-2 transition duration-150 rounded-full cursor-pointer hover:bg-secondary-ceo ${router === item.link && 'bg-secondary-ceo'}`}
                            data-tooltip-target="tooltip-default">
                            <Link href={item.link as "/ceo" | "/ceo/proyectos" | "/ceo/portafolio" | "/ceo/info" | "/ceo/estudios" | "/ceo/code"}>{item.icon} 
                                <p id={item.title} className="sr-only">{item.desc}</p>
                            </Link>
                            
                        </div>
                    ))}
                </div>
            </nav>
        </MotionTransition>
    );
}

export default Navbar;