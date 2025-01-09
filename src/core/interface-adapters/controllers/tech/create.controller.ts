import { TechBase, TechForm } from "@/core/domain/entities/Tech";
import { createTechUC, readAllTechsUC, readOneTechUC, updateTechUC } from "@/core/application/usecases/entities/tech";
import { actualizarMd } from "../../utils/tech/actualizarMd";
import { actualizarJson } from "../../utils/tech/actualizarJson";

export async function createTechC(data: TechForm): Promise<{success: boolean, message: string}> {
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
        let success = false;
        let message = '';

        if (!lenguajeTo) {
            // Caso 1: Publicar un nuevo lenguaje
            const nuevoLenguaje = await createTechUC(nuevoItem);
            success = !!nuevoLenguaje;
            message = success 
                ? `Lenguaje ${name} guardado correctamente en la BDD.`
                : `No se ha podido guardar ${name} en la BDD.`;

        } else {
            const lenguaje = await readOneTechUC({ name: lenguajeTo });
            if (!lenguaje) {
                return { success: false, message: `Lenguaje no encontrado: ${lenguajeTo}` };
            }

            if (!frameworkTo) {
                // Caso 2: Agregar un framework a un lenguaje
                lenguaje.frameworks.push(nuevoItem);
                const res = await updateTechUC({name: lenguajeTo}, lenguaje, {new: true});
                const frameworkAgregado = res?.frameworks?.some(fw => fw.name === nuevoItem.name);
                
                success = !!frameworkAgregado;
                message = success
                    ? `Framework ${name} agregado correctamente al lenguaje ${lenguajeTo}.`
                    : `Error al agregar el framework ${name} al lenguaje ${lenguajeTo}.`;

            } else {
                // Caso 3: Agregar una librería a un framework
                const framework = lenguaje.frameworks.find((fw: any) => fw.name === frameworkTo);
                if (!framework) {
                    return { success: false, message: `Framework no encontrado: ${frameworkTo}` };
                }

                framework.librerias.push(nuevoItem);
                await lenguaje.save();
                success = true;
                message = `Librería ${name} agregada correctamente al framework ${frameworkTo} del lenguaje ${lenguajeTo}.`;
            }
        }

        if (success) {
            // Solo actualizamos los archivos si la operación en BDD fue exitosa
            const proyectosDB = await readAllTechsUC();
            await Promise.all([
                actualizarMd(proyectosDB, { name, badge, colorhash: color }),
                actualizarJson()
            ]);
        }

        return { success, message };

    } catch (error) {
        console.error("Error al publicar la tecnología:", error);
        return { success: false, message: "Error al publicar la tecnología" };
    }
}