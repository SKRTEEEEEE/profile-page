import Image from "next/image";
import { MotionTransition } from "../main/transition-component";

const AvatarServices = () => {
    return (
        <MotionTransition position='right' className="bottom-0 left-0 hidden xl:inline-block xl:absolute">
            <Image src="/services.svg" width="400" height="400" className="w-[350px] h-full " alt="Particles " />
        </MotionTransition>
    );
}

export default AvatarServices;