"use client"

import { dataCounter } from "@/data/data";
import CountUp from "react-countup";

const CounterServices = () => {
    return (
        <div className="grid justify-between max-w-3xl grid-cols-2 gap-3  my-8 md:flex md:grid-cols-4 md:gap-6">
            {dataCounter.map(({ id, endCounter, text, lineRight, lineRightMobile }) => (
                <div key={id} className={`${lineRight && 'ltr'}`}>
                    <h2 tabIndex={0} className={`${lineRight && 'px-4 border-2 border-transparent md:border-e-gray-100'} ${lineRightMobile && 'border-e-gray-100'}`} >
                        <span className="flex mb-2 text-2xl font-extrabold md:text-4xl text-secondary">
                            + <CountUp end={endCounter} start={0} duration={5} />
                        </span>
                        <span className="text-xs uppercase max-w-[100px]">
                            {text}
                        </span>
                    </h2>
                </div>
            ))}
        </div>
    );
}

export default CounterServices;