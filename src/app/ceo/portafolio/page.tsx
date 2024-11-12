import PortfolioBox from "@/components/ceo/portfolio-box";
import { MotionTransition } from "@/components/oth/transition-component";
import TransitionPage from "@/components/oth/transition-page";
import { dataPortfolio } from "@/lib/data-ceo";

import Image from "next/image";


const PortfolioPage = () => {

    return (
        <main className="w-full max-w-6xl px-4 pb-40 mx-auto mt-40 md:pb-0 md:px-6">
            <TransitionPage />
            <MotionTransition position='bottom' className="bottom-0 left-0 hidden md:inline-block md:absolute ">
            <Image src="/ceo/avatar-works.png" width="200" height="300" className="w-full h-full " alt="Particles " />
        </MotionTransition>
        <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
            <Image src="/ceo/circles.png" width="300" height="300" className="w-full h-full " alt="Imagen decorativa circular de una ciudad futurista " />
        </div>
            <div className="flex flex-col justify-center h-full">
                <h1 className="text-2xl leading-tight text-center md:text-4xl md:mb-5">Ejemplos <span className="font-bold text-secondary-ceo">open-source</span> destacados</h1>

                <div className="relative z-10 grid max-w-5xl gap-6 mx-auto mt-4 md:grid-cols-4">
                    {dataPortfolio.map((data) => (
                        <PortfolioBox key={data.id} data={data} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default PortfolioPage;