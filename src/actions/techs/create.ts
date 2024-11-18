"use server"

import { connectToDB } from "@/core/infrastructure/connectors/mongo-db";
import { TechBase, TechForm } from "@/core/domain/entities/Tech";
import { createTechUC, readOneTechUC, updateTechUC } from "@/core/application/usecases/entities/tech";


export async function publicarTech(data: TechForm) {
    await connectToDB();

    const { name, afinidad, badge, preferencia, color, experiencia, img, lenguajeTo, frameworkTo } = data;

    const nuevoItem: TechBase = {
        name,
        afinidad,
        badge,
        preferencia,
        color,
        experiencia,
        img
    };

    try {
        if (!lenguajeTo) {
            // Caso 1: Publicar un nuevo lenguaje
            const nuevoLenguaje = await createTechUC(nuevoItem);
            if(!nuevoLenguaje) return {success: false, message:`No se ha podido guardar ${name} en la BDD.` }
            return { success: true, message: `Lenguaje ${name} guardado correctamente en la BDD.` };
        }

        const lenguaje = await readOneTechUC({ name: lenguajeTo });
        if (!lenguaje) {
            return { success: false, message: `Lenguaje no encontrado: ${lenguajeTo}` };
        }

        if (!frameworkTo) {
            // Caso 2: Agregar un framework a un lenguaje
            lenguaje.frameworks.push(nuevoItem);
            const res = await updateTechUC({name: lenguajeTo}, lenguaje)
            if(!res?.frameworks?.find(fw=>fw.name === nuevoItem.name)) return {success: false,message: `Error al agregar el framework ${name} al lenguaje ${lenguajeTo}.` }
            return { success: true, message: `Framework ${name} agregado correctamente al lenguaje ${lenguajeTo}.` };
        }

        // Caso 3: Agregar una librería a un framework
        const framework = lenguaje.frameworks.find((fw:any) => fw.name === frameworkTo);
        if (!framework) {
            return { success: false, message: `Framework no encontrado: ${frameworkTo}` };
        }

        framework.librerias.push(nuevoItem);
        await lenguaje.save();
        // const res = await updateTechUC({name: lenguajeTo}, nuevoItem)
        // if(res !== lenguaje) return {success: false,message: `Error al agregar el framework ${name} al lenguaje ${lenguajeTo}.` }
        return { success: true, message: `Librería ${name} agregada correctamente al framework ${frameworkTo} del lenguaje ${lenguajeTo}.` };

    } catch (error) {
        console.error("Error al publicar la tecnología:", error);
        return { success: false, message: "Error al publicar la tecnología" };
    }
}