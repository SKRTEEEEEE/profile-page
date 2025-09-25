
import { revalidatePath } from "next/cache";
import { deleteImageUC } from "@/core/application/usecases/services/img";
import {  apiActualizarGithubTechsCApi, apiDeleteTechUC, mongooseDeleteTechUC,  mongooseReadOneTechUC } from "@/core/application/usecases/entities/tech";
import { actualizarGithubTechsCMongoose, ActualizarGithubTechsType } from "./github.controller";
import { FwBase, LibBase } from "@/core/domain/entities/tech";



async function doDeleteMongoose (tipo:string, name:string) {
    console.debug(`${tipo} ${name} eliminada correctamente`);
    // const proyectosDB = await mongooseReadAllTechsUC()
    //Pasar esto al deleteTechC
    // await actualizarJson();
    actualizarGithubTechsCMongoose({type: ActualizarGithubTechsType.ALL})//esto lo he de pasar a backend
    console.debug(`${tipo} ${name} eliminada correctamente del json`);
    // await actualizarMd(proyectosDB);
    console.debug(`${tipo} ${name} eliminada correctamente del md`);
    //Hay que hacer bien esta parte de aquí!
    revalidatePath("/admin/techs")
    revalidatePath("/test/mongodb")
    return true;
}
async function doDeleteApi (tipo:string, name:string) {
    console.debug(`${tipo} ${name} eliminada correctamente`);
    // const proyectosDB = await mongooseReadAllTechsUC()
    //Pasar esto al deleteTechC
    // await actualizarJson();
    apiActualizarGithubTechsCApi({type: ActualizarGithubTechsType.ALL})//esto lo he de pasar a backend
    console.debug(`${tipo} ${name} eliminada correctamente del json`);
    // await actualizarMd(proyectosDB);
    console.debug(`${tipo} ${name} eliminada correctamente del md`);
    //Hay que hacer bien esta parte de aquí!
    revalidatePath("/admin/techs")
    revalidatePath("/test/mongodb")
    return true;
}
export async function deleteTechCMongoose(name: string) {
    try {
        let proyectoActualizado = null;

        // Buscar en librerías
        let lenguaje = await mongooseReadOneTechUC({filter:{ "frameworks.librerias.nameId": name }});
        if (lenguaje) {
            const frameworkIndex = lenguaje.frameworks.findIndex((fw:FwBase) => fw.librerias?.some((lib:LibBase) => lib.nameId === name));
            const libreriaIndex = lenguaje.frameworks[frameworkIndex].librerias.findIndex((lib:LibBase) => lib.nameId === name);
            const libreria = lenguaje.frameworks[frameworkIndex].librerias.find((lib:LibBase) => lib.nameId === name);

            // Eliminar la librería
            lenguaje.frameworks[frameworkIndex].librerias.splice(libreriaIndex, 1);
            proyectoActualizado = await lenguaje.save();
            if (proyectoActualizado) {
                await deleteImageUC(libreria.img)
                const res = await doDeleteMongoose("Librería", name);
                return res;
            }
        }

        // Buscar en frameworks
        lenguaje = await mongooseReadOneTechUC({filter:{ "frameworks.nameId": name }});
        if (lenguaje) {
            const frameworkIndex = lenguaje.frameworks.findIndex((fw:FwBase) => fw.nameId === name);
            const framework = lenguaje.frameworks.find((fw:FwBase) => fw.nameId === name);

            // Eliminar imágenes de librerías asociadas al framework
            for (const libreria of framework.librerias) {
                await deleteImageUC(libreria.img);
            }

            // Eliminar el framework
            lenguaje.frameworks.splice(frameworkIndex, 1);

            proyectoActualizado = await lenguaje.save();
            if (proyectoActualizado) {
                //Aqui hay que hacer el doDeleteMongoose, por cada lib que tubiere si las tubiere
                await deleteImageUC(framework.img)
                const res = await doDeleteMongoose("Framework", name);
                return res;
            }
        }

        // Buscar en lenguajes
        const lenguajeEliminado = await mongooseDeleteTechUC({filter:{ nameId: name }});
        if (lenguajeEliminado) {
             // Eliminar imágenes de frameworks y librerías
             for (const framework of lenguajeEliminado.frameworks) {
                await deleteImageUC(framework.img);
                for (const libreria of framework.librerias) {
                    await deleteImageUC(libreria.img);
                }
            }
            await deleteImageUC(lenguajeEliminado.img)
            const res = await doDeleteMongoose("Lenguaje", name);
            return res;
        }
        console.log(`No se encontró una tecnología con el nombre especificado: ${name}`);
        return false;
    } catch (error) {
        console.error('Error eliminando la tecnología:', error);
        throw new Error('Error eliminando la tecnología');
    }
}
export async function deleteTechCApi(name: string) {
    try {
        const res = await apiDeleteTechUC(name)
        console.log("res", res)
        if(!res.success)throw new Error("Error al eliminar la tecnología")
        await deleteImageUC(res.data.img)
        const res2 = await doDeleteApi("Tecnología", name);
        return res2;
    } catch (error) {
        console.error('Error eliminando la tecnología:', error);
        throw new Error('Error eliminando la tecnología');
    }
}