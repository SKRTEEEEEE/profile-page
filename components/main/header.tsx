"use client"

import { socialNetworks } from "@/data";
import Link from "next/link";
import { MotionTransition } from "./transition-component";
import Image from "next/image";

const Header = () => {
    return (
        <MotionTransition position="bottom" className=" absolute z-40 inline-block w-full top-5 md:top-10">
            <header>
                <div className="container justify-between max-w-6xl mx-auto md:flex">
                    <Link href='/' aria-describedby="link-header-title" className="flex items-center justify-center gap-4">
                        <Image alt="logo del desarrollador" width={60} height={5} src="/skrt-white.png"/>
                        <h1 className="text-4xl font-bold text-center md:text-left">
                            SKRTEEEEEE
                            <span className="text-secondary">Dev</span>
                        </h1>
                        <p id="link-header-title" className="hidden">Link a la pagina principal</p>
                    </Link>
                    <div className="flex items-center justify-center gap-7">
                        {socialNetworks.map(({ logo, src, id, title, desc }) => (
                            <Link
                                key={id}
                                href={src}
                                target="_blank"
                                className="transition-all duration-300 hover:text-secondary"
                            >
                                {logo}<p id={title} className="hidden">{desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </header>
        </MotionTransition>
    );
}

export default Header;