// "use client" -> No me dejava quitar el use client porque el counter services no lo tenia

import CounterServices from "@/components/ceo/counter-services";
import TimeLine from "@/components/ceo/time-line";
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
type TimeLineProps = {
    id: string
    title: string
    desc: string
    subtitle: string
    date: string
    web?: string
    badges?: string[] // Para poder crear los links de los badges necesitamos
    // badges?: [PreTechBase, ...Array<PreTechBase[]>] // Para poder crear los links de los badges necesitamos
}
const StudiesPage = () => {
    const t = useTranslations("ceo")
    const arrData: TimeLineProps[] = dataStudiesPage.map((data,index)=>({
        id: data.id.toString(),
        title: t(`estudios.list.${data.id}.title`),
        desc: t(`estudios.list.${data.id}.desc`),
        subtitle: data.institution,
        date: data.date,
        web: data.link
    }))
    return (
        <main className="mt-6 lg:mt-4 pb-12 md:pb-2 md:mb-0 lg:pb-0 ">

        <TransitionPage />
            {/* <span className="w-full max-w-6xl px-4 pb-40 mx-auto mt-40 md:pb-0 md:px-6"> */}

            
            <MotionTransition position="bottom" className="top-14 right-0 hidden xl:inline-block xl:absolute ">
            <Image priority src="/ceo/avatar1.svg" width={"550"} height={"550"} className="" alt={t("images.office")}/>
                </MotionTransition>
                <div className="pt-24 gap-4 flex flex-col px-12">
                <h1 tabIndex={0} className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
                    <span className="font-bold text-secondary-ceo">
                {t("estudios.h1.0")}
                    </span>
                    {' '}{t("estudios.h1.1")}
                </h1>

                <CounterServices />

                {/* <TimeLineHARD /> */}
                <TimeLine arrData={arrData}/>
                </div>
{/* </span> */}
            {/* <TransitionPage /> */}
        </main>
    );
}

export default StudiesPage;