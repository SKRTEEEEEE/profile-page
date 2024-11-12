
import Image from 'next/image';
import { fetchWeb3Projects } from '@/lib/fetch';
import TransitionPage from '@/components/oth/transition-page';
import { MotionTransition } from '@/components/oth/transition-component';
import SliderCode from '@/components/ceo/slider-code';

const Web3Page = async () => {
    const web3page = await fetchWeb3Projects();

    return (
        <main>
            <TransitionPage />
            <MotionTransition position='bottom' className="bottom-0 left-0 hidden md:inline-block md:absolute ">
                <Image src="/ceo/avatar-code.png" width="200" height="300" className="w-full h-full " alt="Imagen decorativa de un avatar" />
            </MotionTransition>
            <div className='flex flex-col justify-center min-h-dvh'>
                <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
                    <Image src="/circles.png" width="300" height="300" className="w-full h-full " alt="Imagen decorativa circular de una ciudad futurista" />
                </div>
                <h1 tabIndex={0} className="text-2xl leading-tight text-center md:text-4xl md:mb-5">
                    Ejemplos de proyectos
                    <span className="block font-bold text-secondary-ceo"> de desarrollo web3
                    </span>
                </h1>
                <SliderCode data={web3page.map(({ _id, name, description, path, contractUrl, usos }) => ({
                    id: _id.toString(), // Convertir _id a string porque solo se pueden enviar textos planos al servidor
                    name,
                    description,
                    path,
                    contractUrl,
                    usos
                }))}/>
               
            </div>
        </main>
    );
}

export default Web3Page;