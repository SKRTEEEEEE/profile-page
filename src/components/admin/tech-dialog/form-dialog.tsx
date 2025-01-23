"use client"
import { rv } from "@/actions/revrd";
import { createTech, updateTech } from "@/actions/tech";
import { toast } from "@/components/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription,  DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FullTechData,  TechForm, techSchema } from "@/core/domain/entities/tech";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { JSX, useEffect, useReducer, useState } from "react"
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
type FormState = {
  currentStep: number
  errors: string[]
  selectedTech: string
  isLoading: boolean
  previewImage: string | null
}
type FormAction = 
  | {type: "SET_STEP"; payload: number}
  | { type: 'SET_ERRORS'; payload: string[] }
  | { type: 'SET_SELECTED_TECH'; payload: string }
  | { type: "SET_PREVIEW_IMAGE"; payload: string | null }
  | { type: 'SET_LOADING'; }
  | { type: 'RESET_FORM'; payload?: FullTechData }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }

  const createInitialState = (tech?: FullTechData): FormState => ({
    currentStep: 1,
    errors: [],
    selectedTech: tech?.nameId || '',
    isLoading: false,
    previewImage: tech?.img || null
  })
  function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
      case 'SET_STEP':
        return { ...state, currentStep: action.payload }
      case 'SET_ERRORS':
        return { ...state, errors: action.payload }
      case 'SET_SELECTED_TECH':
        return { ...state, selectedTech: action.payload }
      case 'SET_LOADING':
        return { ...state, isLoading: !state.isLoading }
      case 'SET_PREVIEW_IMAGE':
        return {...state, previewImage: action.payload}
      case 'RESET_FORM':
        return createInitialState(action.payload)
      case 'NEXT_STEP':
        return { ...state, currentStep: state.currentStep + 1, errors: [] }
      case 'PREVIOUS_STEP':
        return { ...state, currentStep: Math.max(1, state.currentStep - 1), errors: [] }
      default:
        return state
    }
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
const handleImageUpload = async (imageFile: any, tech?: FullTechData) => {
  if (!tech || tech.img !== imageFile) {
    if (imageFile) {
      const formData = new FormData()
      formData.append("img", imageFile)
      const imgUrl = tech?.img 
        ? await updateImg(formData, tech.img)
        : await uploadImg(formData)

      const validation = techSchema.shape.img.safeParse(imgUrl)
      if (!validation.success) {
        throw new InputParseError("Error with img upload storage")
      }
      return imgUrl
    }
  }
  return tech?.img
}
export default function TechFormDialog({ renderButton, admins, tech, dispo }: TechDialogProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [state, dispatch] = useReducer(formReducer, createInitialState(tech))

  const { isAdmin, account } = useIsAdmin(admins)
  const locale = useLocale()

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
  const isUpdating = !!tech



  const handleStepComplete = (step: number) => {
    if (step === 1) {
      dispatch({
        type: "SET_SELECTED_TECH",
        payload: form.watch("nameId")
      })
    }
    dispatch({type: "NEXT_STEP"})
    // setErrors([])
  }

  const handlePreviousStep = () => {
    if (state.currentStep > 1) {
      dispatch({ type: 'PREVIOUS_STEP' })
      // setErrors([])
    }
  }


  const handleError = (errors: string[]) => {
    dispatch({ type: 'SET_ERRORS', payload: errors })
  }

  const handlePreviewImage = (file: string|null ) => {
    dispatch({type: "SET_PREVIEW_IMAGE", payload: file})
  }


  const onSubmit = async () => {
        dispatch({type: "SET_LOADING"})    
      try {
        if (!isAdmin || account=== undefined) {
        toast({ title: "Error", description: "No tienes permisos para realizar esta acción", variant: "destructive" })
        return
      }

    const imageFile = form.getValues("img")

     const imgUrl = await handleImageUpload(imageFile, tech) 
     if (imgUrl) {
      form.setValue("img", imgUrl)
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
      dispatch({ type: 'RESET_FORM' , payload: tech })

    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{renderButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tech ? "Editar" : "Añadir"} tecnología {state.selectedTech}</DialogTitle>
          <DialogDescription>Ingresa los datos de la tecnología.</DialogDescription>
        </DialogHeader>
        {state.errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <ul className="list-disc list-inside">
              {state.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <FormProvider {...form}>
        {state.currentStep === 1 && <StepOne isAdmin={isAdmin} isUpdating={isUpdating} form={form} onComplete={() => handleStepComplete(1)} onError={handleError} />}
        {state.currentStep === 2 && <StepTwo previewImage={state.previewImage} onPreviewImage={handlePreviewImage} isUpdating={isUpdating} form={form} onComplete={() => handleStepComplete(2)} onError={handleError} onPrevious={handlePreviousStep} dispo={dispo} />}
        {state.currentStep === 3 && <LastStep isAdmin={isAdmin} form={form} loading={state.isLoading} onSubmit={onSubmit}  onError={handleError} onPrevious={handlePreviousStep} />}
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}