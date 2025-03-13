import { TabsSectionPortafolio } from "@/components/ceo/portafolio/tabs-section";
import { MotionTransition } from "@/components/oth/transition-component";
import TransitionPage from "@/components/oth/transition-page";
import { readExampleProjectsUC } from "@/core/application/usecases/entities/project";
import { getTranslations } from "next-intl/server";

import Image from "next/image";


const PortfolioPage = async () => {
    const t = await getTranslations("ceo")
    const exProjects = await readExampleProjectsUC()

    return (
        <main>
            <TransitionPage />
            <MotionTransition position='bottom' className="bottom-0 left-0 hidden xl:inline-block xl:absolute ">
                <Image src="/ceo/avatar-works.png" width="200" height="300" className="w-full h-full " alt={t("images.tablet")} />
            </MotionTransition>
            <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
                <Image src="/ceo/circles.png" width="300" height="300" className="w-full h-full " alt={t("images.circular")} />
            </div>
            <h1 className="flex max-sm:flex-wrap gap-2 absolute top-[15%] sm:left-1/3 max-sm:pl-8 text-wrap sm:text-4xl sm:sr-only font-bold ">
                <span className="text-primary-ceo-500">{t("portafolio.h1.0")}</span>
                <span className="text-secondary-ceo-500">{t("portafolio.h1.1")}</span>
                <span className="text-primary-ceo-300">{t("portafolio.h1.2")}</span>
            </h1>
            <TabsSectionPortafolio selectedProjects={exProjects} />
        </main>
    );
}

export default PortfolioPage;