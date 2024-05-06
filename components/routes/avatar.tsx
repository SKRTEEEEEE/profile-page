
"use client"

import Image from "next/image";

import { MotionTransition } from "../main/transition-component";

export function Avatar() {
    return (
        <MotionTransition position="bottom" className="top-14 right-0 hidden md:inline-block md:absolute ">
            <Image src="/avatar1.svg" width="550" height="550" className="" alt="Particles " />
        </MotionTransition>
    )
}
