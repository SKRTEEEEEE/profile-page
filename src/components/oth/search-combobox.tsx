"use client"

import * as React from "react"
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
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { UseFormReturn } from "react-hook-form"


type ComboboxDemoProps = {
  title: string;
  data: {
    name:string
    [key: string]: any;
  }[]
  name: string
  form: UseFormReturn<any, any, undefined>

}
export function SearchCombobox({title, data, name, form }:ComboboxDemoProps) {
  return (
    <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <div className="h-full flex justify-between items-center">
        <FormLabel>{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}: </FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-[200px] justify-between",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? data.find(
                      (dat) => dat.name === field.value
                    )?.name
                  : `Selecciona  ${title}`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder= {`Busca ${title}...`} />
              <CommandList>
                <CommandEmpty>{title} no encontrado.</CommandEmpty>
                <CommandGroup>
                  {data.map((dat) => (
                    <CommandItem
                      value={dat.name}
                      key={dat.name}
                      onSelect={() => {
                        form.setValue(name, dat.name)
                      }}
                    >
                      {dat.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          dat.name === field.value
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
        </Popover></div>
        <FormDescription>
          This is the language that will be used in the dashboard.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}




