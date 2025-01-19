"use client"
import { MotionTransition } from "../oth/transition-component";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { BookText, CodeSquare,  HomeIcon, UserRound, Linkedin, Link as LucideLink, Info } from "lucide-react";


const itemsNavbar = [
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon size={25} color="#fff" strokeWidth={1} aria-describedby="Home" />,
        link: "/",
        desc: {
            es: "Volver al inicio",
            de: "Zur Startseite zurückkehren",
            en: "Go to start"
        }
    },
    {
        id: 2,
        title: "Perfil",
        icon: <UserRound size={25} color="#fff" strokeWidth={1} aria-describedby="Perfil" />,
        link: "/ceo",
        desc: {
            es: "Presentación perfil",
            de: "Profilpräsentation",
            en: "Profile presentation"
        }
    },
    {
        id: 3,
        title: "Información",
        icon: <Info size={25} color="#fff" strokeWidth={1} aria-describedby="Información" />,
        link: "/ceo/info",
        desc: {
            es: "Principal Información tecnológica",
            de: "Wichtige technologische Informationen",
            en: "Main technological information"
        }
    },
    {
        id: 4,
        title: "Portafolio",
        icon: <CodeSquare size={25} color="#fff" strokeWidth={1} aria-describedby="Portafolio" />,
        link: "/ceo/portafolio",
        desc: {
            es: "Principales proyectos de código abierto",
            de: "Wichtigste Open-Source-Projekte",
            en: "Main open-source projects"
        }
    },
    {
        id: 5,
        title: "Estudios",
        icon: <BookText size={25} color="#fff" strokeWidth={1} aria-describedby="Estudios" />,
        link: "/ceo/estudios",
        desc: {
            es: "Estudios certificados oficiales",
            de: "Offizielle zertifizierte Studien",
            en: "Official certified studies"
        }
    },
    {
        id: 6,
        title: "Code",
        icon: <LucideLink size={25} color="#fff" strokeWidth={1} aria-describedby="Code" />,
        link: "/ceo/code",
        desc: {
            es: "Información sobre proyectos de código abierto web3",
            de: "Informationen zu Open-Source-Web3-Projekten",
            en: "Information about open-source web3 projects"
        }
    },
];

const Navbar = () => {
    const router = usePathname()
    const locale = useLocale()

    return (
        <MotionTransition position="right" className="fixed z-40 flex flex-col items-center justify-center w-full mt-auto h-max bottom-2">
            <nav>
                <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-foreground/15 background-blur-sm">
                    {itemsNavbar.map((item) => (
                        <div
                            key={item.id}
                            className={`px-3 py-2 transition duration-150 rounded-full cursor-pointer hover:bg-secondary-ceo ${router === item.link && 'bg-secondary-ceo'}`}
                            data-tooltip-target="tooltip-default">
                            <Link href={item.link as "/ceo" | "/ceo/proyectos" | "/ceo/portafolio" | "/ceo/info" | "/ceo/estudios" | "/ceo/code"}>{item.icon} 
                                <p id={item.title} className="sr-only">{item.desc[locale as 'es' | 'de' | 'en']}</p>
                            </Link>
                            
                        </div>
                    ))}
                </div>
            </nav>
        </MotionTransition>
    );
}

export default Navbar;