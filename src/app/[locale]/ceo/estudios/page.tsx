// "use client" -> No me dejava quitar el use client porque el counter services no lo tenia

import CounterServices from "@/components/ceo/counter-services";
import TimeLine, { DataTimeLine } from "@/components/ceo/time-line";
import { MotionTransition } from "@/components/oth/transition-component";
import TransitionPage from "@/components/oth/transition-page";
import { useTranslations } from "next-intl";
import Image from "next/image";

const dataStudiesPage = [
    {
        id: 1,
        institution: "CIEF",
        date: "30/10/24",
        badges: [
            "JavaScript", "HTML", "CSS", "Node.js", "Express.js", "MySQL", "BDD", "OOP", "DOM"
        ],
        link: "https://www.grupcief.com/"
    },
    {
        id: 2,
        institution: "Chainlink",
        date: "20/01/24",
        badges: [
            "Chainlink", "Blockchain", "Solidity", "ERC721", "ERC20", "Blockchain Oracles", "CCIP", "Chainlink Functions"
        ],
        link: "https://coinmarketcap.com/currencies/chainlink/"
    },
    {
        id: 3,
        institution: "Coliseum",
        date: "19/12/23",
        badges: [
            "Python"
        ],
        link: "https://www.centrocoliseum.com/"
    },
];

const StudiesPage = () => {
    const t = useTranslations("ceo")
    const arrData: DataTimeLine[] = dataStudiesPage.map((data, index) => ({
        id: data.id.toString(),
        title: t(`estudios.list.${data.id}.title`),
        desc: t(`estudios.list.${data.id}.desc`),
        subtitle: data.institution,
        date: data.date,
        web: data.link
    }))
    return (
        <main className="min-sm:max-h-dvh max-w-dvw">

            <TransitionPage />



            <MotionTransition position="bottom" className="top-14 right-0 hidden xl:inline-block xl:absolute ">
                <Image priority src="/ceo/avatar1.svg" width={"550"} height={"550"} className="" alt={t("images.office")} />
            </MotionTransition>
            <div className="pt-24 gap-4 flex flex-col ">
                <span className="mx-6 min-sm:pt-2 max-sm:bg-blend-luminosity max-sm:h-[25dvh]">
                    <h1 tabIndex={0} className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
                        <span className="font-bold text-secondary-ceo">
                            {t("estudios.h1.0")}
                        </span>
                        {' '}{t("estudios.h1.1")}
                    </h1>

                    <CounterServices />
                </span>


                <div className="relative  max-sm:h-[75dvh] overflow-hidden">
                    {/* Degradado en la parte superior e inferior para efecto de desvanecimiento */}
                    <div className="sm:hidden pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-violet-400/20 to-transparent" />
                    <div className="sm:hidden pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />

                    {/* Contenedor de TimeLine con overflow y scroll suave */}
                    <div className="h-full mx-12  overflow-y-auto pt-8 max-sm:pb-32 scroll-smooth shadow-lg rounded-lg">
                        <TimeLine arrData={arrData} classNameMain="2xl:mx-auto" />
                    </div>
                </div>


            </div>
        </main>
    );
}

export default StudiesPage;