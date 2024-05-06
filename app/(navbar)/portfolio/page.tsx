import { dataPortfolio } from "@/data";

import AvatarPortfolio from "@/components/routes/avatar-portfolio";
import CircleImage from "@/components/routes/circle-image";
import TransitionPage from "@/components/main/transition-page";
import ContainerPage from "@/components/main/container-page";
import PortfolioBox from "@/components/routes/portfolio-box";


const PortfolioPage = () => {

    return (
        <ContainerPage>
            <TransitionPage />
            <AvatarPortfolio />
            <CircleImage />
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