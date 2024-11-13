import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';

/*
<Image alt="waving" className="inline mb-6" width={40} height={5} src="/waving.gif"/>
*/

const Introduction = () => {
    return (
        <div className="z-20  w-full">
            <div className="z-20 flex items-center justify-around max-h-dvh p-6 py-20 md:py-s0 md:grid-cols-2">
                <Image src="/ceo/home-4.png" priority width="300" height="800" className="hidden sm:flex" alt="Avatar" />
                <div className="flex flex-col justify-center max-w-xl">
                    <h1 tabIndex={0} className="mt-6 text-3xl relative top-6 font-bold"><span className="text-primary-ceo-300">Hola, </span><span className="text-primary-ceo-400">soy </span><br className="md:hidden"/><span className="text-5xl">Adan Reh Mañach</span></h1>
                    <h2  className="h-32 text-2xl mt-12 leading-tight text-center md:text-left md:text-4xl md:mb-10">Desarrollador, <br />
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
                            speed={25}
                            repeat={Infinity}
                            className="font-bold text-secondary-ceo"
                        />
                    </h2>

                    <p tabIndex={0} className="mx-auto mb-2 text-md md:text-xl md:mx-0 md:mb-8">
                        Fullstack especializado en tecnologías escalables e descentralizadas, enfocado en ofrecer una experiencia de usuario agradable a traves de funcionalidad interactiva y segura.
                    </p>

                    <div className="flex items-center justify-center gap-3 md:justify-start md:gap-10">
                        <Link href="/ceo/proyectos" className="px-3 py-2 my-2 transition-all border-2 cursor-pointer text-md w-fit rounded-xl hover:shadow-xl hover:shadow-white/50">
                            Ver proyectos
                        </Link>
                        <Link href="mailto:adanreh.m@gmail.com"
                            className="px-3 py-2 my-5 transition-all border-2 cursor-pointer text-md w-fit text-primary-ceo-200/80 border-secondary-ceo rounded-xl hover:shadow-xl hover:shadow-secondary-ceo" >
                            Contacta conmigo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;