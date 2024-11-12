// "use client" -> No me dejava quitar el use client porque el counter services no lo tenia

import CounterServices from "@/components/ceo/counter-services";
import TimeLine from "@/components/ceo/time-line";
import { MotionTransition } from "@/components/oth/transition-component";
import TransitionPage from "@/components/oth/transition-page";
import Image from "next/image";

const StudiesPage = () => {
    return (
        <main className="w-full max-w-6xl px-4 pb-40 mx-auto mt-40 md:pb-0 md:px-6">

        <TransitionPage />
            
            <MotionTransition position="bottom" className="top-14 right-0 hidden md:inline-block md:absolute ">
            <Image src="/ceo/avatar1.svg" width="550" height="550" className="" alt="Dev en su escritorio desarrollando" />
        </MotionTransition>
                <h1 tabIndex={0} className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
                    <span className="font-bold text-secondary-ceo">
                Estudios certificados
                    </span>
                    {' '}destacados
                </h1>

                <CounterServices />

                <TimeLine />

            {/* <TransitionPage /> */}
        </main>
    );
}

export default StudiesPage;