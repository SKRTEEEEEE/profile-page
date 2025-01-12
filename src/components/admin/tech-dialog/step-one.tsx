import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { DialogFooter } from '@/components/ui/dialog'
import { SearchPreTechCombobox } from '../search-pretech-combobox'
import { firstStepTechSchema } from '@/core/domain/entities/tech'
import { readByNamePreTech } from '@/actions/pre-tech'
import { StepTechProps } from './form-dialog'

// Aquí faltara mostrar el estado de la tech, como la web y el color para que el usuario pueda modificar la web.
// En el futuro, permitir poner badges con logos personalizados -> ver en docs/utils



export function StepOne({
    onComplete,
    onError,
    form
}: StepTechProps) {

    const [isLoading, setIsLoading] = useState(false)
    // const t = useTranslations('tech')

    const handleContinue = async () => {
        console.log("clicked")
        setIsLoading(true)
        try {
       
                    onComplete(2)
                
        } catch (error) {
            console.error('Error fetching pre-tech data:', error)
            // onError([t('errors.fetchError')])
            onError([`Error al cargar los datos de la tech`])
        } finally {
            setIsLoading(false)
        }
    }
    // useEffect(() => {
    //     if (account) {
    //         setIsLogged(true)
    //         const user = airdropUsers?.find(user => user.address === account.address)
    //         setIsListed(user ? true : false)

    //     } else {
    //         setIsLogged(false)
    //     }
    // }, [account])

    // const handleContinue = () => {
    //     const result = stepOneSchema.safeParse({ address: account?.address })
    //     if (result.success) {
    //         onComplete(result.data)
    //     } else {
    //         onError(result.error.errors.map(err => err.message))
    //     }
    // }

    return (
        <div className="space-y-4">
            <section className="text-sm text-gray-500">
                <h2>estas en el formulario para introducir o modificar una nueva tecnología</h2>
                <p>busca la tecnologia a añadir</p>
                 {/*<h2>{t("first.h2")}</h2>
                <p>{t("first.desc.0")} <br />
                    <i>{t("first.desc.1")}</i>
                    <br /><br /></p>

                <p>🚀 {t("first.sec-title")}:</p>  <br />
                <ul className='text-xs'>
                    <li className="flex w-full justify-between">
                        <span>20 FTMH</span>
                        <p>{t("first.list.20")}</p>
                    </li>
                    <li className="flex w-full justify-between">
                        <span>30 FTMH</span>
                        <p>{t("first.list.30")}</p>
                    </li>
                    <li className="flex w-full justify-between">
                        <span>50 FTMH</span>
                        <p>{t("first.list.50")}</p>
                    </li>
                    <li className="flex w-full justify-between">
                        <span>60 FTMH</span>
                        <p>{t("first.list.60")}</p>
                    </li>
                </ul>
                <br />
                <p>{t("first.sec-desc.0", { date: airdropDate })} <br />👻 {t("first.sec-desc.1")} </p>
                <br /><br />
                <p className='font-bold'>
                    {t("first.footer-desc")}</p> */}
                    <SearchPreTechCombobox name="nameId" title='nombre' form={form} />

            </section>
            <DialogFooter className='w-full '>
         
                        <Button
                            className="h-full w-full rounded-lg bg-violet-500/15 hover:bg-violet-800 shadow-violet-400/30 hover:shadow-violet-300 text-white font-semibold shadow-md hover:shadow-md transition-all duration-300 ease-in-out mb-1"
                            variant="default"
                            onClick={handleContinue}
                            disabled={isLoading}
                        >
                            {/* {isListed ? t("first.button.0") : t("first.button.1")} */}
                            {isLoading? "Loading...": "Continuar"}
                        </Button>


                
            </DialogFooter>
        </div>
    )
}

