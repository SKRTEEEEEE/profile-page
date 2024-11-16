"use server"

import { IFramework, ILenguaje, ILibreria, LenguajesModel } from "@/models/lenguajes-schema";
import { revalidatePath } from "next/cache";
import { actualizarJson } from "./actualizarJson";
import { connectToDB } from "@/core/infrastructure/connectors/mongo-db";
import { getUtapi } from "../img";
import { actualizarMd } from "./actualizarMd";




const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };
//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"

// async function updateMd() {
//     await connectToDB();
//     try {
//         const proyectosDB: ILenguaje[] = await LenguajesModel.find();
//         const filePath = path.md;
//         const mdSha = await fetchFileSha(filePath);

//         if (!mdSha) {
//             throw new Error("El archivo .md no se encuentra en el repositorio");
//         }

//         let newMdContent = `# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
// <p align="center">
// <a href="#">
//     <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
// </a>
// </p>\n\n\n***\n<br>\n\n`;

//         proyectosDB.sort((a, b) => a.preferencia - b.preferencia).forEach((proyecto) => {
//             newMdContent += `\n\n>- ## ${createBadgeTech(proyecto)}`
//             if (proyecto.frameworks) {
//                 proyecto.frameworks.sort((a, b) => a.preferencia - b.preferencia);
//                 proyecto.frameworks.forEach((framework) => {
//                     newMdContent += `\n\n> ### ${createBadgeTech(framework)}`;

//                     if (framework.librerias) {
//                         framework.librerias.sort((a, b) => a.preferencia - b.preferencia).forEach((libreria) => {
//                             newMdContent += `\n> - #### ${createBadgeTech(libreria)}`;
//                         });
//                     }
//                 })
//             }
//         });

//         await updateFileContent(filePath, "Actualizar archivo .md", newMdContent, mdSha);

//         console.log("Archivo .md actualizado correctamente");
//     } catch (error) {
//         console.error('Error actualizando el archivo .md:', error);
//         throw new Error('Error actualizando el archivo .md');
//     }
// }
export async function deleteImage (img: string) {
    const fileName = img.split('/').pop();
    if (fileName) {
        const utapi = await getUtapi()
        const { success, deletedCount } = await utapi.deleteFiles(fileName);
        console.log(`Eliminada: ${success} \n ${deletedCount} Imagen ${fileName}`);
        return success
    }
    return false
}

async function doDelete (tipo:string, name:string, img: string) {
    console.log(`${tipo} ${name} eliminada correctamente`);
    await deleteImage(img)
    await actualizarJson();
    console.log(`${tipo} ${name} eliminada correctamente del json`);
    await actualizarMd();
    console.log(`${tipo} ${name} eliminada correctamente del md`);
    revalidatePath("/admin/techs")
    revalidatePath("/test/mongodb")
    return true;
}
export async function deleteTech(name: string) {
    await connectToDB();
    try {
        let proyectoActualizado = null;

        // Buscar en librerías
        let lenguaje = await LenguajesModel.findOne({ "frameworks.librerias.name": name });
        if (lenguaje) {
            const frameworkIndex = lenguaje.frameworks.findIndex((fw:IFramework) => fw.librerias?.some((lib:ILibreria) => lib.name === name));
            const libreriaIndex = lenguaje.frameworks[frameworkIndex].librerias.findIndex((lib:ILibreria) => lib.name === name);
            const libreria = lenguaje.frameworks[frameworkIndex].librerias.find((lib:ILibreria) => lib.name === name);

            // Eliminar la librería
            lenguaje.frameworks[frameworkIndex].librerias.splice(libreriaIndex, 1);
            proyectoActualizado = await lenguaje.save();
            if (proyectoActualizado) {
                const res = await doDelete("Librería", name, libreria.img);
                return res;
            }
        }

        // Buscar en frameworks
        lenguaje = await LenguajesModel.findOne({ "frameworks.name": name });
        if (lenguaje) {
            const frameworkIndex = lenguaje.frameworks.findIndex((fw:IFramework) => fw.name === name);
            const framework = lenguaje.frameworks.find((fw:IFramework) => fw.name === name);


            // Eliminar el framework
            lenguaje.frameworks.splice(frameworkIndex, 1);

            proyectoActualizado = await lenguaje.save();
            if (proyectoActualizado) {
                const res = await doDelete("Framework", name, framework.img);
                return res;
            }
        }

        // Buscar en lenguajes
        const lenguajeEliminado = await LenguajesModel.findOneAndDelete({ name: name });
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