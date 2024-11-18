import { TechBase, TechForm } from "@/core/domain/entities/Tech";
import { createTechUC, readOneTechUC, updateTechUC } from "@/core/application/usecases/entities/tech";
import { actualizarMd } from "../../utils/tech/actualizarMd";
import { actualizarJson } from "../../utils/tech/actualizarJson";

export async function createTechC(data: TechForm):Promise<{success:boolean, message:string}> {
    const { name, afinidad, badge, preferencia, color, experiencia, img, lenguajeTo, frameworkTo } = data;
    await actualizarMd({name,badge, colorhash:color})


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
            const res = await updateTechUC({name: lenguajeTo}, lenguaje, {new:true})
            // Validar directamente en el resultado devuelto por `updateTechUC`
            const frameworkAgregado = res?.frameworks?.some(fw => fw.name === nuevoItem.name);
            if (!frameworkAgregado) {
                return {
                    success: false,
                    message: `Error al agregar el framework ${name} al lenguaje ${lenguajeTo}.`
                };
            }

            return {
                success: true,
                message: `Framework ${name} agregado correctamente al lenguaje ${lenguajeTo}.`
            };
        }

        // Caso 3: Agregar una librería a un framework
        const framework = lenguaje.frameworks.find((fw:any) => fw.name === frameworkTo);
        if (!framework) {
            return { success: false, message: `Framework no encontrado: ${frameworkTo}` };
        }

        framework.librerias.push(nuevoItem);
        await lenguaje.save();
        await actualizarJson()
        // const res = await updateTechUC({name: lenguajeTo}, nuevoItem)
        // if(res !== lenguaje) return {success: false,message: `Error al agregar el framework ${name} al lenguaje ${lenguajeTo}.` }
        return { success: true, message: `Librería ${name} agregada correctamente al framework ${frameworkTo} del lenguaje ${lenguajeTo}.` };

    } catch (error) {
        console.error("Error al publicar la tecnología:", error);
        return { success: false, message: "Error al publicar la tecnología" };
    }
}