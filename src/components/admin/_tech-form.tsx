"use client"


import techBadges from "@/lib/data-slugs";
import { Autocomplete, AutocompleteItem, Button, Input, Radio, RadioGroup, Slider, Spinner, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAsyncList } from "@react-stately/data";
import {  rvrd, rv } from "@/actions/revrd";
import { updateTech } from "@/actions/techs/update";
import { actualizarMd } from "@/actions/techs/actualizarMd";
import { publicarFwALeng, publicarLeng, publicarLibAFw } from "@/actions/techs/create";
import { actualizarJson } from "@/actions/techs/actualizarJson";
import { FrameworkData, FrameworksDispo, FullTechData, LenguajesDispo, LibreriaData, TechBadge } from "@/lib/types";
import { ILenguaje } from "@/models/lenguajes-schema";
import { CConectButton } from "../oth/custom-connect-button";
import CustomAsyncAutocomplete from "./custom-techs-autocomplete";
import { useActiveAccount } from "thirdweb/react";


type FormularioTechsProps = {
    dispoLeng: LenguajesDispo[];
    dispoFw: FrameworksDispo[];
    tech?: FullTechData;
    admins: FlattenAdmin[];
}

type FlattenAdmin = {
    id: string;
    address: string;
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
                    console.log("isAdmin (TechTable): ", isAdminUser);
                    console.log("address: ", account.address);
                }
            } catch (error) {
                console.error('Error al verificar si la cuenta es administrador', error);
            }
        };

        checkIsAdmin();
    }, [admins, account]);

    return {isAdmin, account};
};
const TechFormulario: React.FC<FormularioTechsProps> =  ({ dispoLeng, dispoFw, tech, admins }) => {
    console.log("admins tech-form: ", admins)
    const initialCatTech = tech ? (tech.isLib ? "libreria" : (tech.isFw ? "framework" : "lenguaje")) : "lenguaje";
    const [selectedCat, setSelectedCat] = useState<string>(initialCatTech);
    const [inputValue, setInputValue] = useState<string>(tech?.name||'');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isUpdating = !!tech;


    const { isAdmin, account } =  useIsAdmin(admins);
    console.log("isAdmin: ",isAdmin )



    let list = useAsyncList<TechBadge>({
        async load({ signal, filterText }) {
            // Filtra la lista local según el texto ingresado
            let searchText = filterText ? filterText.toLowerCase() : "";

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const formData = new FormData(e.currentTarget);
            const data: any = Object.fromEntries(formData.entries());
    
            const commonData = {
                name: data.name,
                afinidad: parseInt(data.afinidad, 10),
                badge: data.badge,
                preferencia: parseInt(data.preferencia, 10),
                color: data.color,
                experiencia: parseFloat(data.experiencia),
                img: "imageUploaded-future"
            };
    
            let transformedData;
            switch (selectedCat) {
                case "lenguaje":
                    transformedData = commonData;
                    break;
                case "framework":
                    transformedData = {
                        ...commonData,
                        lenguajeTo: isUpdating ? tech?.isFw : data.lenguajeTo,
                    };
                    break;
                case "libreria":
                    transformedData = {
                        ...commonData,
                        lenguajeTo: isUpdating ? tech?.isFw : data.lenguajeTo,
                        frameworkTo: isUpdating ? tech?.isLib : data.frameworkTo,
                    };
                    break;
                default:
                    throw new Error("Categoría no reconocida");
            }
    
            console.log("transformedData: ", transformedData);
            let response;
            if(isAdmin){
                if (isUpdating) {
                    response = await updateTech(transformedData as ILenguaje | FrameworkData | LibreriaData);
                } else {
                    await actualizarMd(data.name, data.badge, data.color);
                    switch (selectedCat) {
                        case "lenguaje":
                            response = await publicarLeng(transformedData as ILenguaje);
                            break;
                        case "framework":
                            response = await publicarFwALeng(transformedData as FrameworkData);
                            break;
                        case "libreria":
                            response = await publicarLibAFw(transformedData as LibreriaData);
                            break;
                        default:
                            response = {success:false, message: "Categoría no reconocida"}
                            throw new Error("Categoría no reconocida");                         
                    }
                    await actualizarJson();                    
                }
            }else{response={success:false, message: "User not admin"}}
            console.log("response: ", response);
            if (response.success) {
                alert(`¡Felicidades! ${response.message}`);
                rv("/test/mongodb");
                rvrd('/admin/techs');
                

            } else {
                alert(`Oops! ${response.message}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
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
            {(selectedCat === "framework" && !isUpdating || selectedCat == "libreria" && !isUpdating)  &&

                <CustomAsyncAutocomplete items={dispoLeng}
                    label="Lenguaje perteneciente"
                    placeholder="Escribe para buscar..."
                    description="Lenguaje al que pertenece este Framework"
                    name="lenguajeTo"
                    isRequired 
                />
            }
            {(selectedCat === "libreria" && !isUpdating) &&
                <CustomAsyncAutocomplete items={dispoFw}
                    label="Framework perteneciente"
                    placeholder="Escribe para buscar..."
                    description="Framework al que pertenece esta Librería"
                    name="frameworkTo"
                    isRequired 
                />
            }
            

            <Input isRequired name="preferencia" type="number" label="Preferencia" description="Orden en categoría" size="sm" className="max-w-[120px]" defaultValue={tech?.preferencia.toString()}/>
            <Input isRequired name="badge" type="string" label="Badge MD" description="Badge para usar en markdown" size="md"  defaultValue={tech?.badge}/>
            <Input isRequired name="color" type="color-hex" label="Color" description="Color que se pueda usar como logo en los badges de shields.io" size="sm" variant="underlined" labelPlacement="outside-left" defaultValue={tech?.color} />
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
                defaultValue={tech?.experiencia||25}
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
                defaultValue={tech?.afinidad||30}
                className="max-w-md"
            />
            {
            account ? (
                isLoading ? (
                  <p><Spinner size="sm" /> Cargando...</p>
                ) : (
                    <Tooltip  color={isAdmin?"default":"danger"} content={isUpdating?(isAdmin?"Update Tech":"Only Admin"):(isAdmin?"Create Tech":"Only Admin")}>
                  <Button style={{cursor: !isAdmin?"not-allowed":"pointer"}}  disabled={!isAdmin} type="submit">Enviar</Button></Tooltip>
                )
              ) : <CConectButton/>
            
            }
        </form>
    )
}

export default TechFormulario;