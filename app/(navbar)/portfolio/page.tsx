import { dataPortfolio } from "@/data";
import TransitionPage from "@/components/main/transition-page";
import ContainerPage from "@/components/main/container-page";
import PortfolioBox from "@/components/navbar/portfolio-box";
import { MotionTransition } from "@/components/main/transition-component";
import Image from "next/image";


const PortfolioPage = () => {

    return (
        <ContainerPage>
            <TransitionPage />
            <MotionTransition position='bottom' className="bottom-0 left-0 hidden md:inline-block md:absolute ">
            <Image src="/avatar-works.png" width="200" height="300" className="w-full h-full " alt="Particles " />
        </MotionTransition>
        <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
            <Image src="/circles.png" width="300" height="300" className="w-full h-full " alt="Particles " />
        </div>
            <div className="flex flex-col justify-center h-full">
                <h1 className="text-2xl leading-tight text-center md:text-4xl md:mb-5">Ejemplos <span className="font-bold text-secondary">open-source</span> destacados</h1>

                <div className="relative z-10 grid max-w-5xl gap-6 mx-auto mt-4 md:grid-cols-4">
                    {dataPortfolio.map((data) => (
                        <PortfolioBox key={data.id} data={data} />
                    ))}
                </div>
            </div>
        </ContainerPage>
    );
}

export default PortfolioPage;