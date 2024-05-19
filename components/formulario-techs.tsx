"use client"

import { publicarFwATech, publicarLibAFw, publicarProyecto } from "@/actions";
import { IFrameworkDispo, ILenguajeDispo } from "@/app/(routes)/test/form/page";
import techBadges from "@/data/slugs";
import { IFrameworkForm, ILenguajeForm, ILibreriaForm } from "@/types";
// import { createListOfIcons } from "@/utils/scripts/createListOfIcons";
import {  Autocomplete, AutocompleteItem, Button, Input, Radio, RadioGroup, Slider } from "@nextui-org/react";
import { useState } from "react";
import { useAsyncList } from "@react-stately/data";

interface FormularioTechsProps {
    dispoLeng: ILenguajeDispo[];
    dispoFw: IFrameworkDispo[];
    // techBadges: {name: string}[];
}
type TechBadge = {
    name: string;
  };


const FormularioTechs: React.FC<FormularioTechsProps> = ({dispoLeng, dispoFw}) => {
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
    
    // console.log("fw: ", techBadges)
    const [selectedCat, setSelectedCat] = useState("lenguaje");
    const techMessage = `Selecciona tu ${selectedCat}`
    // const avalibleTechs = createListOfIcons();
    return(
        <form onSubmit={async (ev) => {
            
            ev.preventDefault();
            const formData = new FormData(ev.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());
            console.log(data);
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
                    publicarProyecto(transformedData);
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
                        // frameworks: []  // As specified, no frameworks will be included

                    };
                    publicarFwATech(transformedDataFw);
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
                        frameworkTo: data.frameworkTo as string,
                        // frameworks: []  // As specified, no frameworks will be included
                    };
                    publicarLibAFw(transformedDataLib);
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
    </Autocomplete>
            {/*<Autocomplete
                    isRequired
                    variant="bordered"
                    defaultItems={techBadges}
                    name="name"
                    label="Tecnología"
                    placeholder="Nombre de la tecnología"
                    description="Tecnologías con logo disponible en shields.io"
                    className="max-w-xl" size="lg" labelPlacement="outside"
                >
                    {(lenguaje) => <AutocompleteItem key={lenguaje.name}>{lenguaje.name}</AutocompleteItem>}
                </Autocomplete>
             <Input isRequired name="name" type="string" label="Tecnología" description="Nombre que se pueda usar como logo en los badges de shields.io" size="lg" /> */}
            {(selectedCat === "framework" || selectedCat == "libreria") &&
                //<Input isRequired name="lenguajeTo" type="string" label="Lenguaje perteneciente" description="Lenguaje al que pertenece este Framework"/>
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
            //<Input isRequired name="frameworkTo" type="string" label="Framework perteneciente" description="Framework al que pertenece este Librería" />
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
            <Input isRequired name="preferencia" type="number" label="Preferencia" description="Orden en categoría" size="sm" className="max-w-[120px]"/>
            <Input isRequired name="badge" type="string" label="Badge MD" description="Badge para usar en markdown" size="md" />
            <Input isRequired name="color" type="color-hex" label="Color" description="Color que se pueda usar como logo en los badges de shields.io" size="sm" variant="underlined" labelPlacement="outside-left" />
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
                defaultValue={20}
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
                defaultValue={30}
                className="max-w-md"
            />
            <Button type="submit">Enviar</Button>
        </form>
    )
}

export default FormularioTechs;