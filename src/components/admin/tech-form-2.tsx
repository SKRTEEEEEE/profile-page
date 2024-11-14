"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LenguajesDispo, FrameworksDispo } from "@/lib/types"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import techBadges from "@/lib/data-slugs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import {  SearchCombobox } from "../oth/search-combobox"

const techSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  category: z.enum(["lenguaje", "framework", "libreria"], {
    required_error: "Debes seleccionar una categoría",
  }),
  badge: z.string().min(2, "El badge debe tener al menos 2 caracteres"),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color inválido"),
  preferencia: z.number().int().min(1, "Debe ser al menos 1").max(100, "No puede ser mayor a 100"),
  experiencia: z.number().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
  afinidad: z.number().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
  lenguajeTo: z.string().optional(),
  frameworkTo: z.string().optional(),
})

type TechFormValues = z.infer<typeof techSchema>

const defaultValues: Partial<TechFormValues> = {
  category: "lenguaje",
  experiencia: 25,
  afinidad: 30,
  preferencia: 1,
}

interface TechDialogProps {
  dispoLeng: LenguajesDispo[]
  dispoFw: FrameworksDispo[]
  renderButton: JSX.Element
}

export function TechDialog({ dispoLeng, dispoFw, renderButton }: TechDialogProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const form = useForm<TechFormValues>({
    resolver: zodResolver(techSchema),
    defaultValues,
  })

  function onSubmit(data: TechFormValues) {
    //Esto esta por hacer
    console.log(data)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {renderButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir tecnología</DialogTitle>
          <DialogDescription className="text-xs">
            Ingresa los detalles de la nueva tecnología aquí.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="details">Detalles</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4">
                {/* <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de la tecnología" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <SearchCombobox name="name" title="nombre" form={form} data={techBadges} />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Categoría</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="lenguaje" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Lenguaje
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="framework" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Framework
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="libreria" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Librería
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("category") !== "lenguaje" && (
                  // <FormField
                  //   control={form.control}
                  //   name="lenguajeTo"
                  //   render={({ field }) => (
                  //     <FormItem>
                  //       <FormLabel>Lenguaje perteneciente</FormLabel>
                  //       <FormControl>
                  //         <Input placeholder="Lenguaje al que pertenece" {...field} />
                  //       </FormControl>
                  //       <FormMessage />
                  //     </FormItem>
                  //   )}
                  // />
                  <SearchCombobox name="lenguajeTo" title="lenguaje" data={dispoLeng} form={form}/>
                )}
                {form.watch("category") === "libreria" && (
                  // <FormField
                  //   control={form.control}
                  //   name="frameworkTo"
                  //   render={({ field }) => (
                  //     <FormItem>
                  //       <FormLabel>Framework perteneciente</FormLabel>
                  //       <Popover>
                  //         <PopoverTrigger asChild>
                  //           <FormControl>
                  //             <Button
                  //               variant="outline"
                  //               role="combobox"
                  //               className={cn(
                  //                 "w-[200px] justify-between",
                  //                 !field.value && "text-muted-foreground"
                  //               )}
                  //             >
                  //               {field.value
                  //                 ? dispoFw.find(
                  //                     (fw) => fw.name === field.value
                  //                   )?.name
                  //                 : "Select framework"}
                  //               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  //             </Button>
                  //           </FormControl>
                  //         </PopoverTrigger>
                  //         <PopoverContent className="w-[200px] p-0">
                  //           <Command>
                  //             <CommandInput placeholder="Search framework..." />
                  //             <CommandList>
                  //               <CommandEmpty>No language found.</CommandEmpty>
                  //               <CommandGroup>
                  //                 {dispoFw.map((fw) => (
                  //                   <CommandItem
                  //                     value={fw.name}
                  //                     key={fw.name}
                  //                     onSelect={() => {
                  //                       form.setValue("frameworkTo", fw.name)
                  //                     }}
                  //                   >
                  //                     {fw.name}
                  //                     <Check
                  //                       className={cn(
                  //                         "ml-auto",
                  //                         fw.name === field.value
                  //                           ? "opacity-100"
                  //                           : "opacity-0"
                  //                       )}
                  //                     />
                  //                   </CommandItem>
                  //                 ))}
                  //               </CommandGroup>
                  //             </CommandList>
                  //           </Command>
                  //         </PopoverContent>
                  //       </Popover>
                  //       <FormDescription>
                  //         This is the language that will be used in the dashboard.
                  //       </FormDescription>
                  //       <FormMessage />
                  //     </FormItem>
                  //   )}
                  // />
                  <SearchCombobox name="frameworkTo" title="framework" data={dispoFw} form={form}/>
                )}
              </TabsContent>
              <TabsContent value="details" className="space-y-4">
                <FormField
                  control={form.control}
                  name="badge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Badge</FormLabel>
                      <FormControl>
                        <Input placeholder="Badge para usar en markdown" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} />
                      </FormControl>
                      <FormDescription>
                        Color para usar en los badges de shields.io
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferencia</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormDescription>
                        Orden en categoría (1-100)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experiencia"
                  render={({ field }) => (
                    <FormItem>
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
                      <FormDescription>
                        Nivel de experiencia (0-100)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="afinidad"
                  render={({ field }) => (
                    <FormItem>
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
                      <FormDescription>
                        Nivel de afinidad (0-100)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}