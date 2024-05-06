

"use client"

import { Avatar } from "@/components/routes/avatar";
import ContainerPage from "@/components/main/container-page";
import CounterServices from "@/components/routes/counter-services";
import TimeLine from "@/components/routes/time-line";
import TransitionPage from "@/components/main/transition-page";

const StudiesPage = () => {
    return (
        <>

<TransitionPage />
            <ContainerPage>
                <Avatar />
                <h1 className="text-2xl leading-tight text-center md:text-left md:text-5xl md:mt-10">
                    <span className="font-bold text-secondary">
                Estudios certificados
                    </span>
                    {' '}destacados
                </h1>

                <CounterServices />

                <TimeLine />

            </ContainerPage>
            <TransitionPage />
        </>
    );
}

export default StudiesPage;