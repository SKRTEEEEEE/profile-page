"use client"

import { publicarFwATech, publicarLibAFw, publicarProyecto } from "@/actions";
import { IFrameworkForm, ILenguajeForm, ILibreriaForm } from "@/types";
import { Button, Input, Radio, RadioGroup, Slider } from "@nextui-org/react";
import { useState } from "react";



const FormInputTest = () => {
    const [selectedCat, setSelectedCat] = useState("lenguaje");
    return (
        <div className="py-14 my-28 h-dvh flex flex-col align-center items-center justify-center">
            <form onSubmit={async(ev) => {
                //Falta tipar esto
                ev.preventDefault();
                const formData = new FormData(ev.target as HTMLFormElement);
                const data = Object.fromEntries(formData.entries());
                        console.log(data);
                switch(selectedCat){
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

                <Input isRequired name="name" type="string" label="Tecnología" description="Nombre que se pueda usar como logo en los badges de shields.io" size="lg" />
                {(selectedCat==="framework"||selectedCat=="libreria")&&<Input isRequired name="lenguajeTo" type="string" label="Lenguaje perteneciente" description="Lenguaje al que pertenece este Framework"/>}
                {(selectedCat==="libreria")&&<Input isRequired name="frameworkTo" type="string" label="Framework perteneciente" description="Framework al que pertenece este Librería"/>}
                <Input isRequired name="preferencia" type="number" label="Preferencia" description="Orden en su categoría" size="md" />
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
        </div>
    )

}
export default FormInputTest;