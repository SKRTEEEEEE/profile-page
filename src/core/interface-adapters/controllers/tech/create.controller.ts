import { createTechUC, readAllTechsUC, readOneTechUC, updateTechUC } from "@/core/application/usecases/entities/tech";
import { actualizarMd } from "../../utils/tech/actualizarMd";
import { actualizarJson } from "../../utils/tech/actualizarJson";
import { TechBase, TechForm } from "@/core/domain/entities/tech";

export async function createTechC(data: TechForm): Promise<{success: boolean, message: string}> {
    const { nameId,nameBadge,web, usoGithub,desc, afinidad,  preferencia, color, experiencia, img, lengTo, fwTo } = data;
    
    const nuevoItem: TechBase = {
        nameId,
        nameBadge,
        color,
        web,
        usoGithub,
        desc,
        afinidad,
        preferencia,
        experiencia,
        img
    };

    try {
        // 1. Obtener el estado actual de la BD
        const proyectosDB = await readAllTechsUC();
        

        // 2. Guardar en la base de datos
        let success = false;
        let message = '';

        if (!lengTo) {
            // Caso 1: Publicar un nuevo lenguaje
            const nuevoLenguaje = await createTechUC(nuevoItem);
            success = !!nuevoLenguaje;
            message = success 
                ? `Lenguaje ${nameId} guardado correctamente en la BDD.`
                : `No se ha podido guardar ${nameId} en la BDD.`;

        } else {
            const lenguaje = await readOneTechUC({ name: lengTo });
            if (!lenguaje) {
                return { success: false, message: `Lenguaje no encontrado: ${lengTo}` };
            }

            if (!fwTo) {
                // Caso 2: Agregar un framework a un lenguaje
                lenguaje.frameworks.push(nuevoItem);
                const res = await updateTechUC({name: lengTo}, lenguaje, {new: true});
                const frameworkAgregado = res?.frameworks?.some(fw => fw.nameId === nuevoItem.nameId);
                
                success = !!frameworkAgregado;
                message = success
                    ? `Framework ${nameId} agregado correctamente al lenguaje ${lengTo}.`
                    : `Error al agregar el framework ${nameId} al lenguaje ${lengTo}.`;

            } else {
                // Caso 3: Agregar una librería a un framework
                const framework = lenguaje.frameworks.find((fw: any) => fw.name === fwTo);
                if (!framework) {
                    return { success: false, message: `Framework no encontrado: ${fwTo}` };
                }

                framework.librerias.push(nuevoItem);
                await lenguaje.save();
                success = true;
                message = `Librería ${name} agregada correctamente al framework ${fwTo} del lenguaje ${lengTo}.`;
            }
        }
        // 3. Actualizar MD (con los datos fetch antes de actualizar bdd) y JSON
        await Promise.all([
            actualizarMd(proyectosDB, { name: nameId, badge: nameBadge, colorhash: color }),
            // actualizarMd(proyectosDB, { name: nameId, badge, colorhash: color }),
            actualizarJson()
        ]);

        return { success, message };

    } catch (error) {
        console.error("Error al publicar la tecnología:", error);
        return { success: false, message: "Error al publicar la tecnología" };
    }
}