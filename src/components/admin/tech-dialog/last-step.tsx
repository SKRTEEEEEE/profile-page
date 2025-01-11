import { TechForm } from "@/core/domain/entities/tech"
import { StepTechProps } from "./form-dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

type LastStepTechProps = StepTechProps & {
    onSubmit: (data: TechForm) => Promise<void>
    onPrevious: () => void
}

export function LastStep({
    onSubmit,
    onPrevious,
    onError,
    form
}: LastStepTechProps) {
    const handleSubmit = async () => {
        const isValid = await form.trigger(["desc.es", "desc.en", "desc.ca", "desc.de"])
        if (isValid) {
            await onSubmit(form.getValues())
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
                    variant="outline"
                    onClick={onPrevious}
                >
                    Anterior
                </Button>
                <Button
                    variant="default"
                    onClick={handleSubmit}
                >
                    Guardar
                </Button>
            </DialogFooter>
        </div>
    )
}
