'use client'

import * as React from "react"
import { useTransition } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { readByQueryPreTech } from "@/actions/pre-tech"
import { PreTechBase } from "@/core/domain/entities/PreTech"
import { MongooseBase } from "@/core/infrastructure/mongoose/types"

type SearchComboboxProps = {
  title: string;

  name: string;
  form: UseFormReturn<any, any, undefined>;
}

export function SearchPreTechCombobox({ title, name, form }: SearchComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState<(PreTechBase & MongooseBase)[]| []>([])
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = React.useState(false)
  
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const handleSearch = React.useMemo(() => {
    return async (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        startTransition(async () => {
          if (value.length >= 2) {
            setIsLoading(true)
            try {
              const results = await readByQueryPreTech(value)
              setSearchResults(results)
            } catch (error) {
              console.error('Error fetching results:', error)
              setSearchResults([])
            } finally {
              setIsLoading(false)
            }
          } else {
            setSearchResults( [])
          }
        })
      }, 300)
    }
  }, [])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const filteredResults = React.useMemo(() => 
    searchResults.slice(0, 10),
    [searchResults]
  )

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="h-full flex justify-between items-center">
            <FormLabel>{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}: </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-label={`Seleccionar ${title}`}
                    className={cn(
                      "w-[200px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? searchResults.find(
                          (dat) => dat.nameId === field.value
                        )?.nameId
                      : `Selecciona ${title}`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput 
                    placeholder={`Busca ${title}...`}
                    onValueChange={handleSearch}
                    disabled={isLoading}
                  />
                  <CommandList>
                    <CommandEmpty>
                      {isLoading || isPending ? 'Buscando...' : `${title} no encontrado.`}
                    </CommandEmpty>
                    <CommandGroup>
                      {filteredResults.map((dat) => (
                        <CommandItem
                          value={dat.nameId}
                          key={dat.nameId}
                          onSelect={() => {
                            form.setValue(name, dat.nameId)
                            setOpen(false)
                          }}
                        >
                          {dat.nameId}
                          <Check
                            className={cn(
                              "ml-auto",
                              dat.nameId === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <FormDescription>
            Selecciona una tecnología para tu perfil. Escribe al menos 2 caracteres para buscar.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}