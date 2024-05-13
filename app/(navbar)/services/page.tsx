// "use client" -> No me dejava quitar el use client porque el counter services no lo tenia

import ContainerPage from "@/components/main/container-page";
import CounterServices from "@/components/navbar/counter-services";
import TimeLine from "@/components/navbar/time-line";
import TransitionPage from "@/components/main/transition-page";
import { MotionTransition } from "@/components/main/transition-component";
import Image from "next/image";

const StudiesPage = () => {
    return (
        <>

        <TransitionPage />
            <ContainerPage>
            <MotionTransition position="bottom" className="top-14 right-0 hidden md:inline-block md:absolute ">
            <Image src="/avatar1.svg" width="550" height="550" className="" alt="Dev en su escritorio desarrollando" />
        </MotionTransition>
                <h1 tabIndex={0} className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
                    <span className="font-bold text-secondary">
                Estudios certificados
                    </span>
                    {' '}destacados
                </h1>

                <CounterServices />

                <TimeLine />

            </ContainerPage>
            {/* <TransitionPage /> */}
        </>
    );
}

export default StudiesPage;