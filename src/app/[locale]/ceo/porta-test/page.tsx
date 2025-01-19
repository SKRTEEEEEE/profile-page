import { TabsDemo } from "@/components/ceo/porta-test";
import PortfolioBox from "@/components/ceo/portfolio-box";
import { MotionTransition } from "@/components/oth/transition-component";
import TransitionPage from "@/components/oth/transition-page";
import { getProjects } from "@/lib/projects";
import { getTranslations } from "next-intl/server";

import Image from "next/image";


const PortfolioPage = async () => {
    const t = await getTranslations("ceo")
    const dataPortfolio = await getProjects()
    return (
        <main>
            <TransitionPage />
            <MotionTransition position='bottom' className="bottom-0 left-0 hidden xl:inline-block xl:absolute ">
                <Image src="/ceo/avatar-works.png" width="200" height="300" className="w-full h-full " alt={t("images.tablet")} />
            </MotionTransition>
            <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
                <Image src="/ceo/circles.png" width="300" height="300" className="w-full h-full " alt={t("images.circular")} />
            </div>
                <TabsDemo/>
        </main>
    );
}

export default PortfolioPage;