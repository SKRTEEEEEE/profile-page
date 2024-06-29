"use server"



import { IFramework, ILenguaje, LenguajesModel } from "@/models/lenguajes-schema";
import { CommonTechData } from "@/types/global";
import { FrameworkData, LibreriaData } from "@/types/ui";

import { connectToDB } from "@/utils/db-connect";
// CREATE (se usa la funcion revalidateLenguajes en el "client")
// Actualizar base de datos sin operaciones de archivo
export async function publicarLeng({ name, afinidad, badge, preferencia, color, experiencia }: CommonTechData) {
    await connectToDB();
    const nuevoProyecto = new LenguajesModel({
        name,
        afinidad,
        badge,
        preferencia,
        color,
        experiencia
    });

    try {
        const proyectoGuardado = await nuevoProyecto.save();
        console.log("Proyecto guardado correctamente:", proyectoGuardado);
        return { success: true, message: `Proyecto guardado correctamente en la BDD. Proyecto: ${nuevoProyecto.name}` };
    } catch (error) {
        console.error(error);
        return { success: false, message: `Error al guardar el proyecto` };
    }
}

export async function publicarFwALeng({ name, afinidad, badge, preferencia, color, experiencia, lenguajeTo }: FrameworkData) {
    await connectToDB();
    const nuevoFramework = {
        name,
        afinidad,
        badge,
        preferencia,
        color,
        experiencia
    };
    
    try {
        const lenguaje = await LenguajesModel.findOne({ name: lenguajeTo });
        if (lenguaje) {
            lenguaje.frameworks.push(nuevoFramework);
            await lenguaje.save();
            console.log("Framework agregado correctamente:", nuevoFramework);
            return { success: true, message: `Framework guardado correctamente en la BDD. Proyecto: ${nuevoFramework.name}` };
        } else {
            return { success: false, message: `Lenguaje no encontrado ${lenguajeTo}` };
        }
    } catch (error) {
        console.error('Error al agregar el framework:', error);
        return { success: false, message: `Error al guardar el proyecto` };
    }
}

export async function publicarLibAFw({ name, afinidad, badge, preferencia, color, experiencia, lenguajeTo, frameworkTo }: LibreriaData) {
    await connectToDB();
    try {
        const nuevaLibreria = {
            name,
            afinidad,
            badge,
            preferencia,
            color,
            experiencia
        };

        const lenguaje = await LenguajesModel.findOne({ name: lenguajeTo });
        if (!lenguaje) {
            return { success: false, message: `Lenguaje no encontrado: ${lenguajeTo}` };
        }

        const framework = lenguaje.frameworks.find((framework: IFramework) => framework.name === frameworkTo);
        if (!framework) {
            return { success: false, message: `Framework no encontrado en la base de datos: ${frameworkTo}` };
        }

        framework.librerias.push(nuevaLibreria);
        await lenguaje.save();
        console.log("Libreria agregada correctamente:", nuevaLibreria);

        return { success: true, message: `Librería agregada correctamente: ${nuevaLibreria.name}` };
    } catch (error) {
        console.error("Error al agregar la librería: ", error);
        return { success: false, message: `Error al agregar la librería` };
    }
}