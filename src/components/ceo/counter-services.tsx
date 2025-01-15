"use client"

import { dataCounter } from "@/lib/data-ceo";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import CountUp from "react-countup";

const CounterServices = () => {
    const t = useTranslations("ceo.estudios.counter")
    return (
        <div className="grid justify-between max-w-3xl grid-cols-2 gap-3  md:grid-cols-3 md:gap-6">
            {dataCounter.map(({ id, endCounter, lineRight, lineRightMobile }) => (
                <div key={id} className={`${lineRight && 'ltr'}`}>
                    <h2 tabIndex={0} className={cn(`${lineRight && 'px-4 border-2 border-transparent md:border-e-gray-100'} ${lineRightMobile && 'border-e-gray-100'}`, id===2?"gap-4 flex md:grid md:gap-0 ml-4":"")} >
                        <span className="flex mb-2 text-2xl font-extrabold md:text-4xl text-secondary-ceo">
                            + <CountUp end={endCounter} start={0} duration={5} />
                        </span>
                        <span className="text-xs uppercase max-w-[100px]">
                            {t(`${id}`)}
                        </span>
                    </h2>
                </div>
            ))}
        </div>
    );
}

export default CounterServices;