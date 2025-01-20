"use client"
import { rv } from "@/actions/revrd";
import { createTech, updateTech } from "@/actions/tech";
import { toast } from "@/components/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription,  DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FullTechData,  TechForm, techSchema } from "@/core/domain/entities/tech";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { JSX, useEffect, useState } from "react"
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { useActiveAccount } from "thirdweb/react";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { LastStep } from "./last-step";
import { updateImg, uploadImg } from "@/actions/img";
import { InputParseError } from "@/core/domain/errors/main";


/*
# HAY QUE HACER LA PARTE DEL lengTo, fwTo, etc....

*/
export type DispoTechs = {
  dispoLeng?: {name:string}[]
  dispoFw?: {name:string}[]
}

export type StepTechProps = {
  onComplete: (data: number) => void
  onError: (errors: string[]) => void
  form: UseFormReturn<any, any, undefined>;
}

type FlattenAdmin = {
  id: string;
  address: string;
}
type TechDialogProps = {
  renderButton: JSX.Element
  admins: FlattenAdmin[]
  tech?: FullTechData
  dispo: DispoTechs
}
const useIsAdmin = (admins: FlattenAdmin[]) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const account = useActiveAccount();
  
  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        if (account?.address) {
          const isAdminUser = admins.some(admin => admin.address === account.address);
          setIsAdmin(isAdminUser);
        }
      } catch (error) {
        console.error('Error al verificar si la cuenta es administrador', error);
      }
    };

    checkIsAdmin();
  }, [admins, account]);

  return { isAdmin, account };
};
export default function TechFormDialog({ renderButton, admins, tech, dispo }: TechDialogProps) {
  const form = useForm<TechForm>({
    resolver: zodResolver(techSchema),
    defaultValues: tech ?
    { 
      category: tech.isLib ? "lib" : (tech.isFw ? "fw" : "leng") , 
      lengTo: tech.isFw, 
      fwTo: tech.isLib,
      ...tech
    } : {
      nameId: "",
      nameBadge: "",
      color: "#000000",
      web: "",
      experiencia: 10,
      afinidad: 25,
      img: null,
      desc: { es: "", en: "", ca: "", de: "" },
      category: "leng",
    },
  })
  const [open, setOpen] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const [selectedTech, setSelectedTech] = useState<string>(form.watch("nameId")||"")

  const [errors, setErrors] = useState<string[]>([])
  const { isAdmin } = useIsAdmin(admins)
  const locale = useLocale()
  const account = useActiveAccount()
  const isUpdating = !!tech



  const handleStepComplete = (step: number) => {
    if (currentStep === 1) {
      setSelectedTech(form.watch("nameId"))
    }
    setCurrentStep(step + 1)
    setErrors([])
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors([])
    }
  }

  const handleError = (error: string[]) => {
    setErrors(error)
  }

  const onSubmit = async () => {
    setIsLoading(true)
    if (!isAdmin || account=== undefined) {
      toast({ title: "Error", description: "No tienes permisos para realizar esta acción", variant: "destructive" })
      form.reset()  
      setSelectedTech("")
      setCurrentStep(1)
      setIsLoading(false)
      return
    }

    const imageFile = form.getValues("img")
    //Aqui hay que comprobar si se ha cambiado la imagen, sino no hay que hacer ni upload, ni update de la img
    console.log("!imageFile: ",imageFile) //si que hay image en el upload
    console.log("tech  onSubmit dialog:", tech ) //Si que hay tech en el upload
    try {
    if(!tech||tech.img !== imageFile){
      // if(!imageFile && !tech?.img)throw new InputParseError("No img set")
      let imgUrl: string
      if(imageFile){
        const formData = new FormData
        formData.append("img", imageFile)
        if(tech&&tech.img){
          imgUrl = await updateImg(formData, tech.img)

        }else{
          imgUrl = await uploadImg(formData)
        }
        const v = techSchema.shape.img.safeParse(imgUrl)
        if (!v.success) {
          form.reset()  
          setSelectedTech("")
          setCurrentStep(1)
          setIsLoading(false)
          throw new InputParseError("Error with img upload storage")
        }
        form.setValue("img", imgUrl)
      }
    }
      const data = form.getValues()

      const response = tech ? await updateTech(data) : await createTech(data)
      if (response.success) {
        toast({ title: "Éxito", description: response.message })
        rv(`/${locale}/admin/techs`)
        setOpen(false)
      } else {
        toast({ title: "Error", description: response.message, variant: "destructive" })
      }
    } catch (error) {
      console.error(error)
      toast({ title: "Error", description: "Ocurrió un error al procesar la solicitud", variant: "destructive" })
    }
    finally
    {
      form.reset()
      setSelectedTech("")
      setCurrentStep(1)
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{renderButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tech ? "Editar" : "Añadir"} tecnología {selectedTech}</DialogTitle>
          <DialogDescription>Ingresa los datos de la tecnología.</DialogDescription>
        </DialogHeader>
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <FormProvider {...form}>
        {currentStep === 1 && <StepOne isAdmin={isAdmin} isUpdating={isUpdating} form={form} onComplete={() => handleStepComplete(1)} onError={handleError} />}
        {currentStep === 2 && <StepTwo isUpdating={isUpdating} form={form} onComplete={() => handleStepComplete(2)} onError={handleError} onPrevious={handlePreviousStep} dispo={dispo} />}
        {currentStep === 3 && <LastStep isAdmin={isAdmin} form={form} loading={isLoading} onSubmit={onSubmit}  onError={handleError} onPrevious={handlePreviousStep} />}
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}