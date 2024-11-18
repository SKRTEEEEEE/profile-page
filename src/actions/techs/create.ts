"use server"

import { connectToDB } from "@/core/infrastructure/connectors/mongo-db";
import { LenguajesModel } from "@/models/tech-schema";
import { TechBase, TechForm } from "@/core/domain/entities/Tech";


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
            const nuevoLenguaje = new LenguajesModel(nuevoItem);
            await nuevoLenguaje.save();
            return { success: true, message: `Lenguaje ${name} guardado correctamente en la BDD.` };
        }

        const lenguaje = await LenguajesModel.findOne({ name: lenguajeTo });
        if (!lenguaje) {
            return { success: false, message: `Lenguaje no encontrado: ${lenguajeTo}` };
        }

        if (!frameworkTo) {
            // Caso 2: Agregar un framework a un lenguaje
            lenguaje.frameworks.push(nuevoItem);
            await lenguaje.save();
            return { success: true, message: `Framework ${name} agregado correctamente al lenguaje ${lenguajeTo}.` };
        }

        // Caso 3: Agregar una librería a un framework
        const framework = lenguaje.frameworks.find((fw:any) => fw.name === frameworkTo);
        if (!framework) {
            return { success: false, message: `Framework no encontrado: ${frameworkTo}` };
        }

        framework.librerias.push(nuevoItem);
        await lenguaje.save();
        return { success: true, message: `Librería ${name} agregada correctamente al framework ${frameworkTo} del lenguaje ${lenguajeTo}.` };

    } catch (error) {
        console.error("Error al publicar la tecnología:", error);
        return { success: false, message: "Error al publicar la tecnología" };
    }
}