"use server"

import { LenguajesModel } from "@/models/lenguajes-schema";
import { IFramework, IFrameworkForm, ILenguajeForm, ILibreria, ILibreriaForm } from "@/types";
import { connectToDB } from "@/utils/db-connect";
import { actualizarJson } from "./actualizarJson";

// UPDATE(se usa la funcion revalidateLenguajes en el "client")
type UpdateData = ILenguajeForm | IFrameworkForm | ILibreriaForm;
export async function updateTech(updateData: UpdateData) {
    await connectToDB();
    try {
        let proyectoActualizado = null;

        if ('frameworkTo' in updateData) {
            // Es una librería, buscamos el lenguaje que contenga un framework con una librería con el nombre especificado
            const lenguaje = await LenguajesModel.findOne({ "frameworks.librerias.name": updateData.name });
            if (!lenguaje) {
                console.log('No se encontró ninguna librería con el nombre especificado:', updateData.name);
                return { success: false, message: `Error: No se encontró una librería llamada ${updateData.name} en ningún lenguaje registrado.` };
            }

            // Buscar el índice del framework que contenga la librería con el nombre especificado
            const frameworkIndex = lenguaje.frameworks.findIndex((fw: IFramework) => 
                fw.librerias && fw.librerias.some((lib: ILibreria) => lib.name === updateData.name)
            );

            if (frameworkIndex === -1) {
                console.log('No se encontró ningún framework que contenga una librería con el nombre especificado:', updateData.name);
                return { success: false, message: `Error: No se encontró un framework que contenga la librería ${updateData.name}.` };
            }

            // Buscar el índice de la librería dentro del framework especificado
            const libreriaIndex = lenguaje.frameworks[frameworkIndex].librerias.findIndex((lib: ILibreria) => lib.name === updateData.name);

            if (libreriaIndex === -1) {
                console.log('No se encontró la librería dentro del framework especificado:', updateData.name);
                return { success: false, message: `Error: No se encontró la librería ${updateData.name} dentro del framework especificado.` };
            }

            // Actualizar la librería con los nuevos datos
            lenguaje.frameworks[frameworkIndex].librerias[libreriaIndex] = updateData;

            // Guardar los cambios
            proyectoActualizado = await lenguaje.save();
        } else if ('lenguajeTo' in updateData) {
            // Es un framework, buscamos el lenguaje que contenga un framework con el nombre especificado
            const lenguaje = await LenguajesModel.findOne({ "frameworks.name": updateData.name });
            if (!lenguaje) {
                console.log('No se encontró ningún framework con el nombre especificado:', updateData.name);
                return { success: false, message: `Error: No se encontró un framework llamado ${updateData.name} en ningún lenguaje registrado.` };
            }

            // Buscar el índice del framework en el lenguaje
            const frameworkIndex = lenguaje.frameworks.findIndex((fw: IFramework) => fw.name === updateData.name);

            // Actualizar el framework con los nuevos datos
            lenguaje.frameworks[frameworkIndex] = updateData;

            // Guardar los cambios
            proyectoActualizado = await lenguaje.save();
        } else {
            // Es un lenguaje, buscamos y actualizamos el lenguaje con el nombre especificado
            proyectoActualizado = await LenguajesModel.findOneAndUpdate(
                { name: updateData.name },
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!proyectoActualizado) {
                console.log('No se encontró el lenguaje con el nombre especificado:', updateData.name);
                return { success: false, message: `Error: No se encontró un lenguaje llamado ${updateData.name}.` };
            }
        }
        //Comprobación para actualizar el json si se ha actualizado la bdd
        if (!proyectoActualizado) {
            console.log('No se encontró un proyecto con el nombre especificado:', updateData.name);
            return { success: false, message: `Error: No se encontró un proyecto llamado ${updateData.name}.` };
        } else {
            await actualizarJson();
            console.log("Proyecto actualizado correctamente:", proyectoActualizado);
            return { success: true, message: `Éxito: El proyecto ${updateData.name} ha sido actualizado correctamente.` };
        }
        
    } catch (error) {
        console.error('Error actualizando el proyecto:', error);
        return { success: false, message: 'Error: Ocurrió un problema al intentar actualizar el proyecto. Por favor, intente de nuevo más tarde.' };
    }
}