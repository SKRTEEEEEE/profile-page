"use client"

import { updateTech } from "@/actions/badges";
import techBadges from "@/data/slugs";
import { IFrameworkDispo, IFrameworkForm, IJsonTech, ILenguajeDispo, ILenguajeForm, ILibreriaForm } from "@/types";
import {  Autocomplete, AutocompleteItem, Button, Input, Radio, RadioGroup, Slider } from "@nextui-org/react";
import { useState } from "react";
import { useAsyncList } from "@react-stately/data";

interface FormularioTechsProps {
    dispoLeng: ILenguajeDispo[];
    dispoFw: IFrameworkDispo[];
    // techBadges: {name: string}[];
    tech: IJsonTech;
}
type TechBadge = {
    name: string;
  };


const FormularioUpdateTechs: React.FC<FormularioTechsProps> = ({dispoLeng, dispoFw, tech}) => {
    let list = useAsyncList<TechBadge>({
        async load({ signal, filterText }) {
          // Filtra la lista local según el texto ingresado
          let searchText = filterText ? filterText.toLowerCase() : "";

      // Filtra la lista local según el texto ingresado
      let filteredItems = techBadges.filter(item =>
        item.name.toLowerCase().includes(searchText)
      );
    
          return {
            items: filteredItems,
          };
        },
      });
      let catTech = ""
      if (!tech.isLib && !tech.isFw) {
        catTech = "lenguaje";
      } else if (!tech.isLib) {
        catTech = "framework";
      } else {
        catTech = "libreria";
      }
    const [selectedCat, setSelectedCat] = useState<string>(catTech);
    const [inputValue, setInputValue] = useState<string>(tech.name.toString());

  const handleCopyClick = () => {
    setInputValue(list.filterText);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
    const techMessage = `Busca un(a) ${selectedCat} con logo`
    return(
        <form onSubmit={
            async (ev) => {
            
            ev.preventDefault();
            const formData = new FormData(ev.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());

            switch (selectedCat) {
                case "lenguaje":
                    const transformedData: ILenguajeForm = {
                        name: data.name as string,
                        afinidad: parseInt(data.afinidad as string, 10),
                        badge: data.badge as string,
                        preferencia: parseInt(data.preferencia as string, 10),
                        color: data.color as string,
                        experiencia: parseFloat(data.experiencia as string),
                        // frameworks: []  // As specified, no frameworks will be included
                    };
                    updateTech(transformedData);
                    break;
                case "framework":
                    const transformedDataFw: IFrameworkForm = {
                        name: data.name as string,
                        afinidad: parseInt(data.afinidad as string, 10),
                        badge: data.badge as string,
                        preferencia: parseInt(data.preferencia as string, 10),
                        color: data.color as string,
                        experiencia: parseFloat(data.experiencia as string),
                        lenguajeTo: data.lenguajeTo as string,
                        

                    };
                    updateTech(transformedDataFw)
                    break;
                case "libreria":
                    const transformedDataLib: ILibreriaForm = {
                        name: data.name as string,
                        afinidad: parseInt(data.afinidad as string, 10),
                        badge: data.badge as string,
                        preferencia: parseInt(data.preferencia as string, 10),
                        color: data.color as string,
                        experiencia: parseFloat(data.experiencia as string),
                        lenguajeTo: data.lenguajeTo as string,
                        frameworkTo: data.frameworkTo as string};
                        updateTech(transformedDataLib);
                        break;
                default:
                    throw new Error("Categoría no reconocida");
            }
            alert("Congrats🤖🚀🕵️")
        }}>
            <h1>Form input test</h1>
            <RadioGroup
                label="Selecciona a que categoría pertenece la tecnología"
                orientation="horizontal"
                name="Categoría"
                value={selectedCat}
                onValueChange={setSelectedCat}

            >
                <Radio value="lenguaje">Lenguaje</Radio>
                <Radio value="framework">Framework</Radio>
                <Radio value="libreria">Librería</Radio>
            </RadioGroup>

            <Autocomplete
      className="max-w-xs"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      label={techMessage}
      placeholder="Escribe para buscar..."
      variant="bordered"
      onInputChange={list.setFilterText}
    >
      {(item) => (
        <AutocompleteItem key={item.name} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete> <Input  isRequired name="name" type="string" label="Tecnología" description="Nombre que se pueda usar como logo en los badges de shields.io" size="lg" value={inputValue} onChange={handleInputChange}/> <Button onClick={handleCopyClick}>Copiar</Button><Button type="submit">Enviar</Button>
            {(selectedCat === "framework" || selectedCat == "libreria") &&

                <Autocomplete
                    isRequired
                    variant="bordered"
                    defaultItems={dispoLeng}
                    name="lenguajeTo"
                    label="Lenguaje perteneciente"
                    placeholder="Busca el lenguaje"
                    description="Lenguaje al que pertenece este Framework"
                    className="max-w-xs" size="lg" labelPlacement="outside" 
                    
                    
                    
                    
                >
                    {(lenguaje) => <AutocompleteItem key={lenguaje.name}>{lenguaje.name}</AutocompleteItem>}
                </Autocomplete>
                }
            {(selectedCat === "libreria") && 

            <Autocomplete
                    isRequired
                    variant="bordered"
                    defaultItems={dispoFw}
                    name="frameworkTo"
                    label="Framework perteneciente"
                    placeholder="Busca el lenguaje"
                    description="Framework al que pertenece esta Librería"
                    className="max-w-xs" size="lg" labelPlacement="outside"
                >
                    {(lenguaje) => <AutocompleteItem key={lenguaje.name}>{lenguaje.name}</AutocompleteItem>}
                </Autocomplete>
            }
            <Input isRequired name="preferencia" type="number" label="Preferencia" defaultValue={tech.preferencia.toString()} description="Orden en categoría" size="sm" className="max-w-[120px]"/>
            <Input isRequired name="badge" type="string" label="Badge MD" defaultValue={tech.badge} description="Badge para usar en markdown" size="md" />
            <Input isRequired name="color" type="color-hex" label="Color" defaultValue={tech.color} description="Color que se pueda usar como logo en los badges de shields.io" size="sm" variant="underlined" labelPlacement="outside-left" />
            <Slider
                aria-required
                name="experiencia"
                label="Selecciona la experiencia de la tecnología"
                color="foreground"
                size="sm"
                step={2.5}
                marks={[
                    {
                        value: 20,
                        label: "20%",
                    },
                    {
                        value: 40,
                        label: "40%",
                    },
                    {
                        value: 60,
                        label: "60%",
                    },
                    {
                        value: 80,
                        label: "80%",
                    },
                ]}
                defaultValue={tech.experiencia}
                className="max-w-md"
            /><Slider
                name="afinidad"
                label="Selecciona la afinidad a la tecnología"
                color="foreground"
                size="sm"
                step={5}
                marks={[
                    {
                        value: 20,
                        label: "20%",
                    },
                    {
                        value: 40,
                        label: "40%",
                    },
                    {
                        value: 60,
                        label: "60%",
                    },
                    {
                        value: 80,
                        label: "80%",
                    },
                ]}
                defaultValue={tech.afinidad}
                className="max-w-md"
            />
            
        </form>
    )
}

export default FormularioUpdateTechs;