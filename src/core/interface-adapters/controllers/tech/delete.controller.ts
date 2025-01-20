
import { revalidatePath } from "next/cache";
import { deleteImageUC } from "@/core/application/usecases/services/img";
import {  deleteTechUC,  readOneTechUC } from "@/core/application/usecases/entities/tech";
import { FwDocument, LibDocument } from "@/core/domain/entities/tech";
import { actualizarGithubTechsC, ActualizarGithubTechsType } from "./github.controller";



async function doDelete (tipo:string, name:string) {
    console.log(`${tipo} ${name} eliminada correctamente`);
    // const proyectosDB = await readAllTechsUC()
    //Pasar esto al deleteTechC
    // await actualizarJson();
    actualizarGithubTechsC({type: ActualizarGithubTechsType.all})
    console.log(`${tipo} ${name} eliminada correctamente del json`);
    // await actualizarMd(proyectosDB);
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
        let lenguaje = await readOneTechUC({filter:{ "frameworks.librerias.nameId": name }});
        if (lenguaje) {
            const frameworkIndex = lenguaje.frameworks.findIndex((fw:FwDocument) => fw.librerias?.some((lib:LibDocument) => lib.nameId === name));
            const libreriaIndex = lenguaje.frameworks[frameworkIndex].librerias.findIndex((lib:LibDocument) => lib.nameId === name);
            const libreria = lenguaje.frameworks[frameworkIndex].librerias.find((lib:LibDocument) => lib.nameId === name);

            // Eliminar la librería
            lenguaje.frameworks[frameworkIndex].librerias.splice(libreriaIndex, 1);
            proyectoActualizado = await lenguaje.save();
            if (proyectoActualizado) {
                await deleteImageUC(libreria.img)
                const res = await doDelete("Librería", name);
                return res;
            }
        }

        // Buscar en frameworks
        lenguaje = await readOneTechUC({filter:{ "frameworks.nameId": name }});
        if (lenguaje) {
            const frameworkIndex = lenguaje.frameworks.findIndex((fw:FwDocument) => fw.nameId === name);
            const framework = lenguaje.frameworks.find((fw:FwDocument) => fw.nameId === name);

            // Eliminar imágenes de librerías asociadas al framework
            for (const libreria of framework.librerias) {
                await deleteImageUC(libreria.img);
            }

            // Eliminar el framework
            lenguaje.frameworks.splice(frameworkIndex, 1);

            proyectoActualizado = await lenguaje.save();
            if (proyectoActualizado) {
                //Aqui hay que hacer el doDelete, por cada lib que tubiere si las tubiere
                await deleteImageUC(framework.img)
                const res = await doDelete("Framework", name);
                return res;
            }
        }

        // Buscar en lenguajes
        const lenguajeEliminado = await deleteTechUC({ nameId: name });
        console.log("lenguajeEliminado deleteTech: ",lenguajeEliminado)

        if (lenguajeEliminado) {
             // Eliminar imágenes de frameworks y librerías
             for (const framework of lenguajeEliminado.frameworks) {
                await deleteImageUC(framework.img);
                for (const libreria of framework.librerias) {
                    await deleteImageUC(libreria.img);
                }
            }
            await deleteImageUC(lenguajeEliminado.img)
            const res = await doDelete("Lenguaje", name);
            return res;
        }
        console.log(`No se encontró una tecnología con el nombre especificado: ${name}`);
        return false;
    } catch (error) {
        console.error('Error eliminando la tecnología:', error);
        throw new Error('Error eliminando la tecnología');
    }
}