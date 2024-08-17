"use client"


import techBadges from "@/data/slugs";
import { Autocomplete, AutocompleteItem, Button, Input, Radio, RadioGroup, Slider, Spinner, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { useAsyncList } from "@react-stately/data";
import CustomAsyncAutocomplete from "./custom-techs-autocomplete";
import CConnectButton from "../main/custom-connect-button";
import useIsAdmin from "@/hooks/useIsAdmin";
import { revrd, serverRev } from "@/actions/revrd";
import { updateTech } from "@/actions/techs/update";
import { actualizarMd } from "@/actions/techs/actualizarMd";
import { publicarFwALeng, publicarLeng, publicarLibAFw } from "@/actions/techs/create";
import { actualizarJson } from "@/actions/techs/actualizarJson";
import { FlattenAdmin } from "@/utils/utils.types";
import { FrameworkData, FrameworksDispo, FullTechData, LenguajesDispo, LibreriaData, TechBadge } from "@/types/ui";
import { ILenguaje } from "@/models/lenguajes-schema";
import { UploadButton } from "@/utils/uploadthing";


type FormularioTechsProps = {
    dispoLeng: LenguajesDispo[];
    dispoFw: FrameworksDispo[];
    tech?: FullTechData;
    admins: FlattenAdmin[];
}


/* 
- [x] Falta manejar los casos en el que el usuario cambie de fwTo, o libTo en el form
- [x] Falta manejar el caso en el que el usuario este haciendo un update que no pueda cambiar el fwTo y el libTo

El caso create de librerias esta funcionando
*/
const TechFormulario: React.FC<FormularioTechsProps> =  ({ dispoLeng, dispoFw, tech, admins }) => {
    const initialCatTech = tech ? (tech.isLib ? "libreria" : (tech.isFw ? "framework" : "lenguaje")) : "lenguaje";
    const [selectedCat, setSelectedCat] = useState<string>(initialCatTech);
    const [inputValue, setInputValue] = useState<string>(tech?.name||'');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageUploaded, setImageUploaded] = useState<string|false>(false);

    const isUpdating = !!tech;

    /* - [ ] Falta hacer el isAdmin en el server
    Al hacer el isAdmin en el server, utilizando la función creada en auth.ts `actionAdmin()`, lo que hacemos es comprobar desde el servidor, y con la blockchain, que el usuario es "admin".
    Al hacer esto, a diferencia de que no, nos pedirá firmar la comprobación con nuestra wallet (para así demostrar que somos dicho usuario), pero no nos costara gas.
    */
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
                img: imageUploaded
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
                await serverRev("/test/mongodb");
                await revrd('/admin/techs');
                

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
            
            {//Actualmente no permite editar la imagen, también hay que mostrarle al usuario la imagen que ha subido y permitirle cambiarla antes de enviarla al Storage 
            !isUpdating&&(!imageUploaded&&isAdmin)?(

                <UploadButton
                className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                console.log("Url: ",res[0].url)
                alert("Upload Completed");
                setImageUploaded(res[0].url); // Deshabilita el dropzone después de la subida
                }}
                onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
                }}
                disabled={imageUploaded?true:false}
                config={{mode: "manual"}}
                 />
            ):<p style={{ color: "green" }}>Image set correctly.</p>
            
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
              ) : <CConnectButton/>
            
            }
        </form>
    )
}

export default TechFormulario;