"use client"

import Image from 'next/image';

import { MotionTransition } from '../main/transition-component';

const AvatarCode = () => {
    return (
        <MotionTransition position='bottom' className="bottom-0 left-0 hidden md:inline-block md:absolute ">
            <Image src="/avatar-code.png" width="200" height="300" className="w-full h-full " alt="Particles " />
        </MotionTransition>

    );
}

export default AvatarCode;