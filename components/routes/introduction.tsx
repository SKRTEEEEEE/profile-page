import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';

/*
<Image alt="waving" className="inline mb-6" width={40} height={5} src="/waving.gif"/>
*/

const Introduction = () => {
    return (
        <div className="z-20 w-full bg-darkBg/60">
            <div className="z-20 flex items-center justify-around h-full p-6 py-20 md:py-s0 md:grid-cols-2">
                <Image src="/home-4.png" priority width="300" height="800" className="hidden sm:flex" alt="Avatar" />
                <div className="flex flex-col justify-center max-w-md">
                    <h1 className="text-4xl font-bold"><span className="text-primary-300">Hola, </span><span className="text-primary-400">soy </span><br/>Adan Reh Mañach</h1>
                    <h2 className="my-5 text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-10">Desarrollador, <br />
                        <TypeAnimation
                            sequence={[
                                'de la nueva generación web descentralizada',
                                2000,
                                'de branding web para proyectos innovadores', 
                                2000,
                                'de interacción entre mundo real y web3',
                                2000,
                                'utilizando tecnologías web actuales e eficientes.',
                                5000
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="font-bold text-secondary"
                        />
                    </h2>

                    <p className="mx-auto mb-2 text-md md:text-xl md:mx-0 md:mb-8">
                        Fullstack especializado en tecnologías escalables e descentralizadas, enfocado en ofrecer una experiencia de usuario agradable a traves de funcionalidad interactiva y segura.
                    </p>

                    <div className="flex items-center justify-center gap-3 md:justify-start md:gap-10">
                        <Link href="/projects" className="px-3 py-2 my-2 transition-all border-2 cursor-pointer text-md w-fit rounded-xl hover:shadow-xl hover:shadow-white/50">
                            Ver proyectos
                        </Link>
                        <Link href="mailto:adanreh.m@gmail.com"
                            className="px-3 py-2 my-5 transition-all border-2 cursor-pointer text-md w-fit text-secondary border-secondary rounded-xl hover:shadow-xl hover:shadow-secondary" >
                            Contacta conmigo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;