"use client"

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import CountUp from "react-countup";
const dataCounter = [
    {
        id: 0,
        endCounter: 2,
        lineRight: true,
        lineRightMobile: true,
    },
    {
        id: 1,
        endCounter: 80,
        lineRight: true,
        lineRightMobile: false,
    },
    {
        id: 2,
        endCounter: 30,
        lineRight: false,
        lineRightMobile: true,
    },
    // {
    //     id: 3,
    //     endCounter: 30,
    //     text: "Premios ganadores",
    //     lineRight: false,
    //     lineRightMobile: false,
    // },
];
const CounterServices = () => {
    const t = useTranslations("ceo.estudios.counter")
    return (
        <div className="grid justify-between max-w-3xl grid-cols-2 gap-2  md:grid-cols-3 md:gap-6">
            {dataCounter.map(({ id, endCounter, lineRight, lineRightMobile }) => (
                <div key={id} className={`${lineRight && 'ltr'}`}>
                    <h2 tabIndex={0} className={cn(`sm:mt-2 ${lineRight && 'px-2 sm:px-4 border-2 border-transparent md:border-e-gray-100'} ${lineRightMobile && 'border-e-gray-100'}`, id===2?"gap-4 flex md:grid md:gap-0 ml-4":"")} >
                        <span className="flex sm:mb-2 text-2xl font-extrabold md:text-4xl text-secondary-ceo">
                            + <CountUp end={endCounter} start={0} duration={5} />
                        </span>
                        <span className={cn("text-xs sm:text-base uppercase sm:max-w-[100px]", id===2?" max-sm:min-w-full max-sm:mt-2":"")}>
                            {t(`${id}`)}
                        </span>
                    </h2>
                </div>
            ))}
        </div>
    );
}

export default CounterServices;