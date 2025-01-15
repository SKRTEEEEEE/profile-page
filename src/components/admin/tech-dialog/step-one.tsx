import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { DialogFooter } from '@/components/ui/dialog'
import { SearchPreTechCombobox } from '../search-pretech-combobox'
import { StepTechProps } from './form-dialog'
import { PreTechBase } from '@/core/domain/entities/pre-tech'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form"

type FirstStepTechProps = StepTechProps & {
    isUpdating: boolean
    isAdmin: boolean
}

export function StepOne({
    onComplete,
    onError,
    form,
    isUpdating,
    isAdmin
}: FirstStepTechProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedTech, setSelectedTech] = useState<PreTechBase | null>(null)
    const [isFormReady, setIsFormReady] = useState(false)
    const [editWeb, setEditWeb] = useState(false)

    // Efecto inicial para detectar si es un update
    useEffect(() => {
        if(isUpdating){
            const initialValues = form.getValues()
            setSelectedTech({
                nameId: initialValues.nameId,
                nameBadge: initialValues.nameBadge,
                web: initialValues.web,
                color: initialValues.color
            })
            setIsFormReady(true)
        }
    }, [isUpdating, form])
    
    // Observar los cambios en el formulario
    useEffect(() => {
        const subscription = form.watch(() => {
            const { nameId, web, color, nameBadge } = form.getValues()
            
            // Solo actualizar selectedTech si los datos son completos
            if (nameId && web && color) {
                setIsFormReady(true)
                
                const newTechData = {
                    nameId,
                    nameBadge,
                    web,
                    color
                }

                // Actualizar selectedTech solo si hay cambios reales
                setSelectedTech(prev => {
                    if (!prev || 
                        prev.nameId !== newTechData.nameId || 
                        prev.web !== newTechData.web || 
                        prev.color !== newTechData.color) {
                        return newTechData
                    }
                    return prev
                })
            } else {
                setIsFormReady(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [form])

    const handleContinue = async () => {
        setIsLoading(true)
        try {
            onComplete(2)           
        } catch (error) {
            console.error('Error fetching pre-tech data:', error)
            onError([`Error al cargar los datos de la tech`])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <section className="text-sm text-gray-500">
                <h2>Estás en el formulario para {isUpdating ? 'modificar una tecnología existente' : 'introducir una nueva tecnología'}</h2>
                
                {selectedTech && (
                    <>
                        <div className='flex justify-between w-full'>
                            <p>Color asignado para {selectedTech.nameId}:</p>
                            <Badge style={{color: `#${selectedTech.color}`}}>{selectedTech.color}</Badge>
                        </div>
                        
                        <div className="space-y-2">
                            {!editWeb ? (
                                <p className='truncate max-w-[360px]'>
                                    Web: <Link href={selectedTech.web} target='_blank'>{selectedTech.web}</Link>
                                </p>
                            ) : (
                                <FormField
                                    control={form.control}
                                    name="web"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nueva URL</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="https://nueva-url.com" 
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                            
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="edit-web"
                                    checked={editWeb}
                                    onCheckedChange={(checked) => {
                                        setEditWeb(checked as boolean)
                                        if (!checked) {
                                            // Restaurar el valor original si se desmarca
                                            form.setValue("web", selectedTech.web)
                                        }
                                    }}
                                />
                                <label
                                    htmlFor="edit-web"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Modificar URL
                                </label>
                            </div>
                        </div>
                    </>
                )}

                {!isUpdating && (
                    <SearchPreTechCombobox 
                        name="nameId" 
                        title='nombre' 
                        form={form} 
                        isAdmin={isAdmin}
                    />
                )}
            </section>

            <DialogFooter className='w-full'>
                <Button
                    className="h-full w-full rounded-lg bg-violet-500/15 hover:bg-violet-800 shadow-violet-400/30 hover:shadow-violet-300 text-white font-semibold shadow-md hover:shadow-md transition-all duration-300 ease-in-out mb-1"
                    variant="default"
                    onClick={handleContinue}
                    disabled={isLoading || !isFormReady}
                >
                    {isLoading ? "Loading..." : "Continuar"}
                </Button>
            </DialogFooter>
        </div>
    )
}