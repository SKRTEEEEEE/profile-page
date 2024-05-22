"use client"

import { publicarFwALeng, publicarLeng, publicarLibAFw } from "@/actions/badges";
import { IFrameworkDispo, ILenguajeDispo } from "@/app/(routes)/test/form/page";
import techBadges from "@/data/slugs";
import { IFrameworkForm, ILenguajeForm, ILibreriaForm } from "@/types";
import { Autocomplete, AutocompleteItem, Button, Input, Radio, RadioGroup, Slider } from "@nextui-org/react";
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


const FormularioCreateTechs: React.FC<FormularioTechsProps> = ({ dispoLeng, dispoFw }) => {
    const [selectedCat, setSelectedCat] = useState<string>("lenguaje");
    const [inputValue, setInputValue] = useState<string>('');
    const [serverResponse, setServerResponse] = useState<{ success: boolean, message: string } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    //   const handleCopyClick = () => {
    //     setInputValue(list.filterText);
    //   };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data: any = {};
            const formElements = Array.prototype.slice.call(e.currentTarget.elements) as HTMLInputElement[];
            formElements.forEach((field: HTMLInputElement) => {
                if (field.name) {
                    data[field.name] = field.value;
                }
            });


            const requestData = {
                name: data.name,
                afinidad: parseInt(data.afinidad, 10),
                badge: data.badge,
                preferencia: parseInt(data.preferencia, 10),
                color: data.color,
                experiencia: parseFloat(data.experiencia),
                lenguajeTo: selectedCat === "framework" || selectedCat === "libreria" ? data.lenguajeTo : undefined,
                frameworkTo: selectedCat === "libreria" ? data.frameworkTo : undefined,
            };

            let response;
            switch (selectedCat) {
                case "lenguaje":
                    response = await publicarLeng(requestData as ILenguajeForm);
                    break;
                case "framework":
                    response = await publicarFwALeng(requestData as IFrameworkForm);
                    break;
                case "libreria":
                    response = await publicarLibAFw(requestData as ILibreriaForm);
                    break;
                default:
                    throw new Error("Categoría no reconocida");
            }
            setServerResponse(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            if (serverResponse?.success === true) {
                alert(`¡Felicidades! ${serverResponse.message}`);
                window.location.href = "/admin/techs";
            } else if (serverResponse?.success === false) {
                alert(`Oops! ${serverResponse.message}`);
            }
        }
    };


    const techMessage = `Busca un(a) ${selectedCat} con logo`
    return (
        <form onSubmit={handleSubmit}>
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

            <Input isRequired name="name" type="string" label="Tecnología" description="Nombre que se pueda usar como logo en los badges de shields.io" size="lg" value={inputValue} onChange={handleInputChange} /> <Button onClick={() => setInputValue(list.filterText)}>Copiar</Button>
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
            <Input isRequired name="preferencia" type="number" label="Preferencia" description="Orden en categoría" size="sm" className="max-w-[120px]" />
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
            {isLoading ? (
                <p>Cargando...</p>
            ) : (
                <Button type="submit">Enviar</Button>
            )}
        </form>
    )
}

export default FormularioCreateTechs;