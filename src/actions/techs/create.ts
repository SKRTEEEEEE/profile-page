"use server"

import { connectToDB } from "@/core/infrastructure/connectors/mongo-db";
import { LenguajesModel, IFramework } from "@/models/tech-schema";
import {  FrameworkData, LibreriaData } from "@/lib/types";
import { TechBase } from "@/core/domain/entities/Tech";
import { getLengModelUC } from "@/core/application/usecases/entities/tech";

type PublicarData = TechBase & Partial<FrameworkData> & Partial<LibreriaData>;

export async function publicarTech(data: PublicarData) {
    await connectToDB();

    const { name, afinidad, badge, preferencia, color, experiencia, img, lenguajeTo, frameworkTo } = data;

    const nuevoItem = {
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
            // NOS HEMOS QUEDADO AQUI ❕⬇️❗⬇️🧠⚠️❕⬇️❗⬇️❗⬇️✅
            const LengModel = getLengModelUC()
            const nuevoLenguaje = new LengModel(nuevoItem);
            await nuevoLenguaje.save();
            return { success: true, message: `Lenguaje ${name} guardado correctamente en la BDD.` };
        }

        const lenguaje = await LenguajesModel.findOne({ name: lenguajeTo });
        if (!lenguaje) {
            return { success: false, message: `Lenguaje no encontrado: ${lenguajeTo}` };
        }

        if (!frameworkTo) {
            // Caso 2: Agregar un framework a un lenguaje
            lenguaje.frameworks.push(nuevoItem as IFramework);
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