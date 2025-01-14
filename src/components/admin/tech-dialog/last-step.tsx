import { TechForm } from "@/core/domain/entities/tech"
import { StepTechProps } from "./form-dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useActiveAccount } from "thirdweb/react"
import { Save } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FaSpinner } from "react-icons/fa"

type LastStepTechProps = Omit<StepTechProps, "onComplete"> & {
    onSubmit: () => Promise<void>
    onPrevious: () => void
    loading: boolean
    isAdmin: boolean
}

export function LastStep({
    onSubmit,
    onPrevious,
    onError,
    loading,
    form,
    isAdmin
}: LastStepTechProps) {
    const account = useActiveAccount()

    const handleSubmit = async () => {
        const isValid = await form.trigger(["desc.es", "desc.en", "desc.ca", "desc.de"])
        if (isValid) {
            await onSubmit()
        } else {
            onError(["Por favor, completa todas las descripciones"])
        }
    }

    return (
        <div className="space-y-4">
            <section>
                <h3>Descripciones</h3>
                {["es", "en", "ca", "de"].map((lang) => (
                    <FormField
                        key={lang}
                        control={form.control}
                        name={`desc.${lang}` as keyof TechForm}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción ({lang.toUpperCase()})</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={`Escribe la descripción en ${lang.toUpperCase()}`}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </section>
            <DialogFooter className='w-full'>
                <Button
                    className="h-full w-full rounded-lg bg-violet-500/15 hover:bg-violet-800 shadow-violet-400/30 hover:shadow-violet-300 text-white font-semibold shadow-md hover:shadow-md transition-all duration-300 ease-in-out mb-1"
                    variant="default"
                    onClick={onPrevious}
                >
                    {/* {isListed ? t("first.button.0") : t("first.button.1")} */}
                    {"Anterior"}
                </Button>
                {/* <Button
                    variant="default"
                    onClick={handleSubmit}
                    disabled={loading || !isAdmin || account === undefined}
                >
                    {!loading ? "Guardar" : "Guardando.."}
                </Button> */}
                {loading ? (
                    <Button variant={"destructive"} className="">
                        <FaSpinner width={6} height={6} color="red" />
                    </Button>
                ) : (

                    <TooltipProvider>
                        <Tooltip>

                            <TooltipTrigger asChild>
                                    <Button  type="submit" className="h-full w-full gap-4 rounded-lg shadow-violet-400/30 hover:shadow-violet-300 text-white font-semibold shadow-md hover:shadow-md transition-all duration-300 ease-in-out mb-1"
                                        variant={(account!== undefined && isAdmin) ? `default` : "destructive"} onClick={handleSubmit}><Save className="h-4 w-4" />
                                        <span >Guardar</span></Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-transparent border-none p-0">
                                <Button variant={(account!==undefined && isAdmin) ? `default` : "destructive"} >{(account && isAdmin) ? `Guardar` : "Solo Admin"}</Button>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                )}
            </DialogFooter>
        </div>
    )
}
