
import Image from 'next/image';
import TransitionPage from '@/components/oth/transition-page';
import { MotionTransition } from '@/components/oth/transition-component';
import SliderCode from '@/components/ceo/slider-code';
import { getTranslations } from 'next-intl/server';
import { creatorData } from '@/lib/data';
export type Web3I18 = {
    id: number
    h2: string
    desc: string
    list: string[]
    instructions: string[]
}

export type Web3Stat = {
    id: number
    path: string
    contract: string
}
const web3Static: Web3Stat[] = [{
    id: 1,
    path: "/nft-raffle",
    contract: `${creatorData.githubUrl}/trySolidity24/blob/main/markdown/contratos_desplegados.md`
}, {
    id: 2,
    path: "/nft-membership",
    contract: `${creatorData.githubUrl}/trySolidity24/blob/main/markdown/contratos_desplegados.md`
}, {
    id: 3,
    path: "/counter",
    contract: `${creatorData.githubUrl}/trySolidity24/blob/main/markdown/contratos_desplegados.md`
}]

async function getWeb3(): Promise<(Web3I18 & Web3Stat)[]> {
    const t = await getTranslations()

    const localeWeb3: Web3I18[] = t.raw("ceo.code.slider")
    const mWeb3 = localeWeb3.map((locale: Web3I18) => {
        const web3base = web3Static.find(web3st => web3st.id === locale.id)
        if (!web3base) throw new Error("Not found static info")
        const { path, contract } = web3base
        return {
            ...locale,
            path,
            contract
        }
    })
    return mWeb3
}
const Web3Page = async () => {
    const web3page = await getWeb3()
    const t = await getTranslations()

    return (
        <main>
            <TransitionPage />
            <MotionTransition position='bottom' className="bottom-0 left-0 hidden md:inline-block md:absolute ">
                <Image src="/ceo/avatar-code.png" width="200" height="300" className="w-full h-full " alt={t("ceo.images.pixel")} />
            </MotionTransition>
            <div className='flex flex-col justify-center min-h-dvh'>
                <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
                    <Image src="/ceo/circles.png" width="300" height="300" className="w-full h-full " alt={t("ceo.images.circular")} />
                </div>
                <h1 tabIndex={0} className="text-2xl leading-tight text-center md:text-4xl md:mb-5">
                    {t("ceo.code.h1.0")}
                    <span className="block font-bold text-secondary-ceo"> {t("ceo.code.h1.1")}
                    </span>
                </h1>
                <SliderCode data={web3page} slider_list_tittle={t("ceo.code.slider_list_tittle")} buttons={t.raw("ceo.code.buttons")}/>
               
            </div>
        </main>
    );
}

export default Web3Page;