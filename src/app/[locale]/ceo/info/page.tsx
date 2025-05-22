

import SliderTechs from "@/components/ceo/slider-techs";
import { MotionTransition } from "@/components/oth/transition-component";
import TransitionPage from "@/components/oth/transition-page";
import { Button } from "@/components/ui/button";
import { readAllTechsCMongoose } from "@/core/presentation/controllers/tech/read.controller";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const AboutMePage = async () => {
    const {flattenTechs:allLeng} = await readAllTechsCMongoose()
    const t = await getTranslations()


    return (
        <main className="mx-8">
            <TransitionPage />
            <div className=" bottom-0 right-0 hidden md:inline-block md:absolute">
                <Image src="/ceo/circles.png" width="300" height="300" className="w-full h-full " alt={t("ceo.images.circular")} />
            </div>
            <MotionTransition position='right' className="bottom-0 left-0 hidden xl:inline-block xl:absolute">
                <Image src="/ceo/services.svg" width="400" height="400" className="w-[350px] h-full " alt={t("ceo.images.tablet_office")} />
            </MotionTransition>
            
            <div className="md:grid md:grid-cols-2 md:pb-20 md:mx-auto flex flex-col-reverse justify-center items-center min-h-dvh max-w-5xl md:gap-6 gap-4 ">
                <section className="max-w-[450px]">

                    
                    <span className="md:inline hidden">
                    <h1 tabIndex={0} className="text-xl mb-4   leading-tight text-center sm:text-left md:text-4xl md:mb-2">{t("ceo.info.section.skills.h1.0")} <span className="font-bold text-secondary-ceo"> {t("ceo.info.section.skills.h1.1")}.</span></h1>
                    <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300 md:mb-4'>{t("ceo.info.section.skills.h2")}: </h2>
                    <ul className="md:mb-3 xl:text-xl 
                    text-gray-300">
                        <li className="p-1 px-4 mb-2 border-secondary-ceo/10 border-4 rounded-md">
                            <span className="text-3xl" tabIndex={0}>Fullstack web JS</span><br />React.js, Next.js, Node.js, Express.js, MongoDB, Mongoose.js, TailwindCss, etc...
                        </li>
                        <li className="p-1 px-4 mb-2 border-secondary-ceo/10 border-4 rounded-md"><span className="text-3xl" tabIndex={0}>Fullstack dApp <i>EVM</i></span><br />Solidity, Ether.js, Thirdweb, Hardhat, Forge, Chainlink, etc... </li>
                    </ul>
                    </span>
                    <div className="space-y-2 flex flex-col w-full">
                        <Button className="w-full" variant={"secondary"}><Link href={"/ceo/docs/techs" as any}>{t("ceo.info.section.skills.buttons.tech")}</Link></Button>
                        <Button variant={"outline"} className="w-full"><Link href={"/admin/techs"}>{t("ceo.info.section.skills.buttons.admin")}</Link></Button>
                    </div>


                </section>

                {/* SLIDER */}
                {allLeng.length > 0 ? 
                    <section className="">
                        <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300 mb-4' tabIndex={0}>{t("ceo.info.section.slider.h2")}: </h2>
                        <SliderTechs data={allLeng} />
                    </section> 
                :
                    <section>
                        <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300 mb-4' tabIndex={0}>🚧Building.... //_🐲 </h2>
                    </section>}
            </div>
        </main>
    );
}

export default AboutMePage;