

import SliderTechs from "@/components/ceo/slider-techs";
import { MotionTransition } from "@/components/oth/transition-component";
import TransitionPage from "@/components/oth/transition-page";
import { Button } from "@/components/ui/button";
import { readAllTechsUC } from "@/core/application/usecases/entities/tech";
import { flattenTechs } from "@/lib/techs";
import { FullTechData } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const AboutMePage = async () => {
    const lenguajes = await readAllTechsUC()
    let allLeng: false|FullTechData[]
    if(!lenguajes){
        allLeng = false
    }else {
     allLeng = flattenTechs(lenguajes)}


    return (
        <main className="bg-opacity-90">
            <TransitionPage/>
            <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
            <Image src="/ceo/circles.png" width="300" height="300" className="w-full h-full " alt="Imagen circular de un poblado futurista" />
        </div>
        <MotionTransition position='right' className="bottom-0 left-0 hidden xl:inline-block xl:absolute">
            <Image src="/ceo/services.svg" width="400" height="400" className="w-[350px] h-full " alt="Hombre con una tableta en la mano" />
        </MotionTransition>
            <section className="md:grid flex flex-col items-center justify-center min-h-dvh max-w-5xl md:gap-6 gap-4 mx-auto md:grid-cols-2">
                <div className="max-w-[450px]">

                    <h1 tabIndex={0} className="text-xl leading-tight text-center sm:text-left xl:text-4xl xl:mb-5">Mis <span className="font-bold text-secondary-ceo"> skills.</span></h1>
                    <h2  className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300'>Perfil profesional: </h2>
                        <ul className="md:mb-3 xl:text-xl 
                    text-gray-300">
                            <li className="mb-2 border-secondary-ceo/10 border-4 rounded-md">
                            <span tabIndex={0}>Fullstack web JS</span><br/>React.js, Next.js, Node.js, Express.js, MongoDB, Mongoose.js, TailwindCss, etc...
                            </li>
                            <li className="mb-2 border-secondary-ceo/10 border-4 rounded-md"><span tabIndex={0}>Fullstack dApp <i>EVM</i></span><br />Solidity, Ether.js, Thirdweb, Hardhat, Forge, Chainlink, etc... </li>
                        </ul>
                    <div className="space-y-2 flex flex-col w-full">
                        <Button className="w-full" variant={"secondary"}>Lista completa de techs utilizadas</Button>
                        <Button variant={"outline"} className="w-full"><Link href={"/admin/techs"}>Ver pagina de administración</Link></Button>
                    </div>
                        
                 
                </div>

                {/* SLIDER */}
                {allLeng!==false?<div>
                    
                    <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300 mb-4' tabIndex={0}>Principales lenguajes utilizados: </h2>
                        <SliderTechs data={allLeng}/>
                    </div>: 
                <div>
                    
                <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300 mb-4' tabIndex={0}>🚧Building.... //_🐲 </h2>
                    
                </div>}
            </section>
        </main>
    );
}

export default AboutMePage;