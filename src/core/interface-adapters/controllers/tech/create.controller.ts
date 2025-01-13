import { createTechUC, readAllTechsUC, readOneTechUC, updateTechUC } from "@/core/application/usecases/entities/tech";
import { Leng, TechBase, TechForm } from "@/core/domain/entities/tech";
import { actualizarJson, actualizarMd, createBaseBadge, getGithubPercentage } from "../../utils/tech";
import { MongooseBase } from "@/core/infrastructure/mongoose/types";

/**
 * Finds the first available number in a sequence of preferences
 * @param preferences Array of existing preference numbers
 * @returns The first available number in the sequence
 */
function findFirstAvailable(preferences: number[]): number {
    if (preferences.length === 0) return 1;
    
    const sortedPrefs = [...preferences].sort((a, b) => a - b);
    let expected = 1;
    
    for (const pref of sortedPrefs) {
        if (pref !== expected) {
            return expected;
        }
        expected++;
    }
    
    return expected;
}

/**
 * Calculates the next available preference number for a technology
 * @param allTechs All existing technologies
 * @param lengTo Parent language ID (if adding framework)
 * @param fwTo Parent framework ID (if adding library)
 * @returns Next available preference number
 */
async function calculateNextPreference(
    allTechs:  (Omit<Leng, "id" | "createdAt" | "updatedAt"> & MongooseBase)[], 
    lengTo?: string, 
    fwTo?: string
): Promise<number> {
    // Case 1: Adding a language
    if (!lengTo) {
        const languagePreferences = allTechs.map(tech => tech.preferencia);
        return findFirstAvailable(languagePreferences);
    }

    // Find the parent language
    const parentLang = allTechs.find(tech => tech.nameId === lengTo);
    if (!parentLang) throw new Error(`Language ${lengTo} not found`);

    // Case 2: Adding a framework
    if (!fwTo) {
        const frameworkPreferences = parentLang.frameworks?.map(fw => fw.preferencia) || [];
        return findFirstAvailable(frameworkPreferences);
    }

    // Case 3: Adding a library
    const parentFw = parentLang.frameworks?.find(fw => fw.nameId === fwTo);
    if (!parentFw) throw new Error(`Framework ${fwTo} not found`);

    const libraryPreferences = parentFw.librerias?.map(lib => lib.preferencia) || [];
    return findFirstAvailable(libraryPreferences);
}

export async function createTechC(data: TechForm): Promise<{success: boolean, message: string}> {
    const { nameId, nameBadge, web, desc, afinidad, color, experiencia, img, lengTo, fwTo } = data;
    console.log("data at createTechC: ", data);

    try {
        // 1. Obtener el estado actual de la BD y calcular uso de GitHub
        const proyectosDB = await readAllTechsUC();
        const usoGithub = await getGithubPercentage(nameId);
        
        // Calcular la siguiente preferencia disponible
        const nextPreference = await calculateNextPreference(proyectosDB, lengTo, fwTo);
        
        const nuevoItem: TechBase = {
            nameId,
            nameBadge,
            color,
            web,
            usoGithub,
            desc,
            afinidad,
            experiencia,
            preferencia: nextPreference,
            img
        };

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
            const lenguaje = await readOneTechUC({ nameId: lengTo });
            if (!lenguaje) {
                return { success: false, message: `Lenguaje no encontrado: ${lengTo}` };
            }

            if (!fwTo) {
                // Caso 2: Agregar un framework a un lenguaje
                lenguaje.frameworks.push(nuevoItem);
                const res = await updateTechUC({nameId: lengTo}, lenguaje, {new: true});
                const frameworkAgregado = res?.frameworks?.some(fw => fw.nameId === nuevoItem.nameId);
                
                success = !!frameworkAgregado;
                message = success
                    ? `Framework ${nameId} agregado correctamente al lenguaje ${lengTo}.`
                    : `Error al agregar el framework ${nameId} al lenguaje ${lengTo}.`;

            } else {
                // Caso 3: Agregar una librería a un framework
                const framework = lenguaje.frameworks.find((fw: any) => fw.nameId === fwTo);
                if (!framework) {
                    return { success: false, message: `Framework no encontrado: ${fwTo}` };
                }

                framework.librerias.push(nuevoItem);
                await lenguaje.save();
                success = true;
                message = `Librería ${nameId} agregada correctamente al framework ${fwTo} del lenguaje ${lengTo}.`;
            }
        }

        const newProyectosDB = await readAllTechsUC();
        // 3. Actualizar MD y JSON
        await Promise.all([
            actualizarMd(proyectosDB, { 
                name: nameBadge, 
                badge: createBaseBadge(nameId, color, nameBadge, web), 
                colorhash: color 
            }),
            actualizarJson(newProyectosDB)
        ]);

        return { success, message };

    } catch (error) {
        console.error("Error al publicar la tecnología:", error);
        return { success: false, message: "Error al publicar la tecnología" };
    }
}