import { MotionTransition } from "@/components/main/transition-component";
import TransitionPage from "@/components/main/transition-page";

import SliderServices from "@/components/navbar/slider-services";
import Image from "next/image";
import Link from "next/link";

const AboutMePage = () => {
    return (
        <main>
            <TransitionPage/>
            <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
            <Image src="/circles.png" width="300" height="300" className="w-full h-full " alt="Particles " />
        </div>
        <MotionTransition position='right' className="bottom-0 left-0 hidden xl:inline-block xl:absolute">
            <Image src="/services.svg" width="400" height="400" className="w-[350px] h-full " alt="Particles " />
        </MotionTransition>
            <section className="md:grid flex flex-col items-center justify-center min-h-dvh max-w-5xl md:gap-6 gap-4 mx-auto md:grid-cols-2">
                <div className="max-w-[450px]">

                    <h1 className="text-xl leading-tight text-center sm:text-left xl:text-4xl xl:mb-5">Mis <span className="font-bold text-secondary"> skills.</span></h1>
                    
                        <ul className="md:mb-3 xl:text-xl 
                    text-gray-300">
                            <li className="mb-2 border-secondary/10 border-4 rounded-md">
                            Fullstack web JS<br/>React.js, Next.js, Node.js, Express.js, MongoDB, Mongoose.js, TailwindCss, etc...
                            </li>
                            <li className="mb-2 border-secondary/10 border-4 rounded-md">Fullstack dApp <i>EVM</i><br />Solidity, Ether.js, Thirdweb, Hardhat, Forge, Chainlink, etc... </li>
                        </ul>
                        
                    <Link href={"mailto:adanreh.m@gmail.com"} className="px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/65">Contacta conmigo</Link>
                </div>

                {/* SLIDER */}
                
                    <SliderServices />
                
            </section>
        </main>
    );
}

export default AboutMePage;