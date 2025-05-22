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
import { IntlKey } from "@/core/domain/entities/intl.type"
import { translate } from "@/actions/translate"
import { useState } from "react"
interface Translation {
    text: string;
    to: string;
  }
  
  interface TranslationResponse {
    translations: Translation[];
  }
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
    const [translating, setTranslating] = useState(false)
    const account = useActiveAccount()

    const handleSubmit = async () => {
        const isValid = await form.trigger(["desc.es", "desc.en", "desc.ca", "desc.de"])
        if (isValid) {
            await onSubmit()
        } else {
            onError(["Por favor, completa todas las descripciones"])
        }
    }
    const translateText = async () => {
        setTranslating(true)
        try {
            const data = form.getValues();
            const desc = data.desc as Record<IntlKey, string>; // Tipado explícito
            
            // 1. Encontrar el idioma fuente y su texto
            const [fromLang, fromText] = Object.entries(desc)
                .find(([_, text]) => text.trim() !== "") || [];
            
            if (!fromLang || !fromText) {
                onError(["Debe ingresar al menos una descripción"]);
                return;
            }
    
            // 2. Preparar idiomas destino (excluyendo el fuente)
            const targetLangs = Object.keys(desc)
                .filter(lang => lang !== fromLang) as IntlKey[];
            
            // 3. Llamar al servicio de traducción
            const translationResult =  await translate(
                fromText, 
                fromLang, 
                targetLangs // ['es', 'ca', 'de'] si fromLang='en'
            );
            if(!translationResult){onError(["Error al traducir. Intente nuevamente"]);return}
            // 4. Mapear resultados al formulario
            // Parsear la respuesta JSON
            const translations: TranslationResponse[] = JSON.parse(translationResult);

            if (translations.length === 0 || !translations[0].translations) {
            onError(["No se recibieron traducciones"]);
            return;
            }

            // 4. Mapear resultados al formulario
            translations[0].translations.forEach((translation) => {
            const targetLang = translation.to as keyof typeof desc;
            form.setValue(`desc.${targetLang}`, translation.text);
            });
                    
                } catch (error) {
                    onError(["Error al traducir. Intente nuevamente"]);
                } finally {
                    setTranslating(false);
                }
            }
            

    return (
        <div className="space-y-4">
            <section>
                <h3>Descripciones</h3>
                { Object.values(IntlKey).map((lang) => (
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
                    disabled={loading}
                >
                    {"Anterior"}
                </Button>
                <Button
                    className="h-full w-full rounded-lg bg-violet-500/15 hover:bg-violet-800 shadow-violet-400/30 hover:shadow-violet-300 text-white font-semibold shadow-md hover:shadow-md transition-all duration-300 ease-in-out mb-1"
                    variant="default"
                    onClick={translateText}
                    disabled={loading||translating}
                >
                    {"Traducir"}
                </Button>
        
                {loading ? (
                    <Button variant={"destructive"} className="w-full">
                        <FaSpinner width={6} height={6} color="red" />
                        <p>Loading...</p>
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
