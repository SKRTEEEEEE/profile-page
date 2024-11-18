
import { revalidatePath } from "next/cache";
import { deleteImageUC } from "@/core/application/usecases/services/img";
import {  deleteTechUC, readOneTechUC } from "@/core/application/usecases/entities/tech";
import { FwDocument, LibDocument } from "@/core/domain/entities/Tech";
import { actualizarJson } from "../../utils/tech/actualizarJson";
import { actualizarMd } from "../../utils/tech/actualizarMd";



async function doDelete (tipo:string, name:string, img: string) {
    console.log(`${tipo} ${name} eliminada correctamente`);
    await deleteImageUC(img)
    await actualizarJson();
    console.log(`${tipo} ${name} eliminada correctamente del json`);
    await actualizarMd();
    console.log(`${tipo} ${name} eliminada correctamente del md`);
    //Hay que hacer bien esta parte de aquí!
    revalidatePath("/admin/techs")
    revalidatePath("/test/mongodb")
    return true;
}
export async function deleteTechC(name: string) {
    try {
        let proyectoActualizado = null;

        // Buscar en librerías
        let lenguaje = await readOneTechUC({ "frameworks.librerias.name": name });
        if (lenguaje) {
            const frameworkIndex = lenguaje.frameworks.findIndex((fw:FwDocument) => fw.librerias?.some((lib:LibDocument) => lib.name === name));
            const libreriaIndex = lenguaje.frameworks[frameworkIndex].librerias.findIndex((lib:LibDocument) => lib.name === name);
            const libreria = lenguaje.frameworks[frameworkIndex].librerias.find((lib:LibDocument) => lib.name === name);

            // Eliminar la librería
            lenguaje.frameworks[frameworkIndex].librerias.splice(libreriaIndex, 1);
            proyectoActualizado = await lenguaje.save();
            if (proyectoActualizado) {
                const res = await doDelete("Librería", name, libreria.img);
                return res;
            }
        }

        // Buscar en frameworks
        lenguaje = await readOneTechUC({ "frameworks.name": name });
        if (lenguaje) {
            const frameworkIndex = lenguaje.frameworks.findIndex((fw:FwDocument) => fw.name === name);
            const framework = lenguaje.frameworks.find((fw:FwDocument) => fw.name === name);


            // Eliminar el framework
            lenguaje.frameworks.splice(frameworkIndex, 1);

            proyectoActualizado = await lenguaje.save();
            if (proyectoActualizado) {
                const res = await doDelete("Framework", name, framework.img);
                return res;
            }
        }

        // Buscar en lenguajes
        const lenguajeEliminado = await deleteTechUC({ name: name });
        if (lenguajeEliminado) {
            const res = await doDelete("Lenguaje", name, lenguajeEliminado.img);
            return res;
        }
        console.log(`No se encontró una tecnología con el nombre especificado: ${name}`);
        return false;
    } catch (error) {
        console.error('Error eliminando la tecnología:', error);
        throw new Error('Error eliminando la tecnología');
    }
}