"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MotionTransition } from "../oth/transition-component";
import LocalSwitcher from "../oth/locale-switch";
import { Github, Mail } from "lucide-react";
import { creatorData } from "@/lib/data";

const socialNetworks = [
    {
        id: 1,
        logo: <Github size={30} strokeWidth={1} aria-describedby="Github"/>,
        src: creatorData.githubUrl,
        title: "Github",
        desc: "Mi perfil en Github"
    },
    // {
    //     id: 2,
    //     logo: <Linkedin size={30} strokeWidth={1} />,
    //     src: "skkdjalksa",
    // },
    {
        id: 3,
        logo: <Mail size={30} strokeWidth={1} aria-describedby="Mail"/>,
        src: creatorData.emailTo,
        title: "Mail",
        desc: "Contacto de correo electrónico"
    },
];

const Header = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("up");
    
    const controlHeader = () => {
        const currentScrollY = window.scrollY;
        
        // Determine scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setScrollDirection("down");
        } else {
            setScrollDirection("up");
        }
        
        // Update last scroll position
        setLastScrollY(currentScrollY);
        
        // Show/hide based on direction with a small delay
        if (scrollDirection === "down") {
            setShow(false);
        } else {
            setShow(true);
        }
    };
    
    useEffect(() => {
        // Add scroll event listener
        window.addEventListener("scroll", controlHeader);
        
        // Cleanup
        return () => {
            window.removeEventListener("scroll", controlHeader);
        };
    }, [lastScrollY, scrollDirection]);
    
    return (
        <div 
            className={`fixed z-40 w-full top-1 md:top-2 transition-all duration-300 ${
                show ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <MotionTransition position="bottom">
                <header>
                    <div className="container justify-between max-w-6xl mx-auto md:flex">
                        <Link href='/' aria-describedby="link-header-title" className="flex items-center justify-center gap-4">
                            <Image alt="logo del desarrollador" width={60} height={60} src="/ceo/skrt-white.png" />
                            <h1 className="text-4xl max-[650px]:text-3xl font-bold text-center md:text-left">
                                SKRTEEEEEE
                                <span className="text-secondary-ceo">Dev</span>
                            </h1>
                            <p id="link-header-title" className="hidden">Link a la pagina principal</p>
                        </Link>
                        <div className="flex items-center justify-center gap-7">
                            <div className="flex items-center justify-center gap-7">
                                {socialNetworks.map(({ logo, src, id, title, desc }) => (
                                    <Link
                                        key={id}
                                        href={src}
                                        target="_blank"
                                        className="transition-all duration-300 hover:text-secondary-ceo"
                                    >
                                        {logo}<p id={title} className="hidden">{desc}</p>
                                    </Link>
                                ))}
                            </div>
                            
                            <LocalSwitcher />
                        </div>
                    </div>
                </header>
            </MotionTransition>
        </div>
    );
}

export default Header;