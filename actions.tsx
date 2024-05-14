"use server"

import fs from "fs";
import { LenguajesModel } from "./models/lenguajes-schema";

export async function publicarProyecto() {
    // Me esta guardando todo el model porque creo un nuevo objeto del modelo
    const nuevoProyecto = new LenguajesModel({  
        name: 'Typescript',
        afinidad: 60,
    });

    try {
        const proyectoGuardado = await nuevoProyecto.save();
        console.log("Proyecto guardado correctamente:", proyectoGuardado);

        const filePath = "data/techs.json";
        let fileContent = [];

        // Leer el archivo existente
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            fileContent = JSON.parse(data);
        }

        // Añadir el nuevo proyecto al array
        fileContent.push(proyectoGuardado);

        // Escribir el archivo con la nueva información
        fs.writeFile(filePath, JSON.stringify(fileContent, null, 2), (err) => {
            if (err) {
                console.error("Error al escribir el archivo:", err);
                return;
            }
            console.log("Archivo techs.json actualizado correctamente.");
        });
    } catch (error) {
        console.error("Error al guardar el proyecto:", error);
    }
}
