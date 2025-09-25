import { useState } from "react";
import { DispoTechs, StepTechProps } from "./form-dialog";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SearchCombobox } from "@/components/oth/search-combobox";
import { DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { z } from "zod";
import { InputParseError } from "@/core/domain/flows/domain.error";





type StepTwoTechProps = StepTechProps & {
  dispo: DispoTechs
  onPrevious: () => void
  isUpdating: boolean
  previewImage: string | null
  onPreviewImage: (file:string|null) => void
}
export function StepTwo({
  onComplete,
  onError,
  onPrevious,
  form,
  dispo,
  isUpdating,
  previewImage,
  onPreviewImage
}: StepTwoTechProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispoLeng, dispoFw } = dispo

  const imageSchema = z.object({
    img: z
      .instanceof(File)
      .refine(file => file.size <= 1 * 1024 * 1024, {
        message: "El tamaño de la imagen debe ser menor a 1 MB",
      })
      .refine(file => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type), {
        message: "El formato de la imagen debe ser .jpg, .png o .gif",
      }),
  });

  const fileCheck = (file: File) => {
    const validationResult = imageSchema.safeParse({ img: file });
    if (!validationResult.success) {
      onError(validationResult.error.errors.map(err => err.message));
      throw new InputParseError(StepTwo, "Error de validación de archivo");
    }
  }

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onError([])
    const file = ev.target.files?.[0]
    if (!file) {
      onError(["Error at select file"])
      throw new InputParseError(StepTwo, "Error at select file");
    }
    fileCheck(file)
    const imgUrl = URL.createObjectURL(file)
    onPreviewImage(imgUrl)
    form.setValue("img", file)
  }

  const handleContinue = async () => {
    setIsLoading(true)
    try {
      !isUpdating && fileCheck(form.watch("img"));
      const isValid = await form.trigger(["category", "lenguajeTo", "frameworkTo", "experiencia", "afinidad"])
      if (isValid) {
        onComplete(3)
      } else {
        onError(["Por favor, completa todos los campos correctamente"])
      }
      // continuar
    } catch (error) {
      onError(["Error al procesar la imagen"])
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="space-y-4">
      <section>
        <h3>bla bla bla</h3>
        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-4 justify-between w-full">
                <FormLabel className="top-0">Logo tecnología</FormLabel>
                <FormControl>
                  {previewImage ? (
                    <div className="space-y-2">
                      <Image src={previewImage} alt="Logo de tecnología" width={60} height={60} className="rounded-xl" />
                      <Button
                        variant="secondary"
                        className="my-auto"
                        onClick={() => {
                          onPreviewImage(null);
                          form.setValue("img", null);
                        }}
                      >
                        Modificar imagen
                      </Button>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      placeholder="Click para cargar una imagen"
                      onChange={handleFileChange}
                    />
                  )}
                </FormControl>
              </div>
              <FormDescription>Imagen para usar como logo de la tecnología</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experiencia"
          render={({ field }) => (
            <FormItem>
              <div className="flex space-x-4 mt-4 items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between w-full gap-x-4">
                    <FormLabel>Experiencia</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={2.5}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Nivel de experiencia (0-100)
                  </FormDescription>
                  <FormMessage />
                </div>
                <div className="text-2xl">{field.value}</div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="afinidad"
          render={({ field }) => (
            <FormItem>
              <div className="flex space-x-4 mt-4 items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between w-full gap-x-4">
                    <FormLabel>Afinidad</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Nivel de afinidad (0-100)
                  </FormDescription>
                  <FormMessage />
                </div>
                <div className="text-2xl">{field.value}</div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem className="space-y-3">
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center text-sm space-x-3"
                    disabled={isUpdating}
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="leng" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Lenguaje
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="fw" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Framework
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="lib" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Librería
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>Solo permitido al crear</FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        {form.watch("category") !== "leng" && (
          <SearchCombobox name="lengTo" title="lenguaje" data={dispoLeng} form={form} disabled={isUpdating} />
        )}
        {form.watch("category") === "lib" && (
          <SearchCombobox name="fwTo" title="framework" data={dispoFw} form={form} disabled={isUpdating} />
        )}
      </section>
      <DialogFooter className='w-full '>
        <Button
          className="h-full w-full rounded-lg bg-violet-500/15 hover:bg-violet-800 shadow-violet-400/30 hover:shadow-violet-300 text-white font-semibold shadow-md hover:shadow-md transition-all duration-300 ease-in-out mb-1"
          variant="default"
          onClick={onPrevious}
        >
          {/* {isListed ? t("first.button.0") : t("first.button.1")} */}
          {"Anterior"}
        </Button>
        <Button
          className="h-full w-full rounded-lg bg-violet-500/15 hover:bg-violet-800 shadow-violet-400/30 hover:shadow-violet-300 text-white font-semibold shadow-md hover:shadow-md transition-all duration-300 ease-in-out mb-1"
          variant="default"
          onClick={handleContinue}
          disabled={isLoading}
        >
          {/* {isListed ? t("first.button.0") : t("first.button.1")} */}
          {isLoading ? "Loading..." : "Continuar"}
        </Button>



      </DialogFooter>
    </div>
  )

}