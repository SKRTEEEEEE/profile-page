"use server"

import { IFramework, ILenguaje, ILibreria, LenguajesModel } from "@/models/lenguajes-schema";
import { revalidatePath } from "next/cache";
import { actualizarJson } from "./actualizarJson";
import { connectToDB } from "@/utils/db-connect";
import { fetchFileSha, updateFileContent } from "./utils";




const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };
//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
function createBadgeTech(tech: ILenguaje | IFramework | ILibreria) {
    return (
        `${tech.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].value&label=%F0%9F%92%97%20Afinidad&color=${tech.color}&style=flat&logo=${tech.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].afinidad&color=${tech.color}&style=flat&label=%20&suffix=%25)\n![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].valueexp&label=%F0%9F%8F%85%20Experiencia&color=${tech.color}&style=flat&logo=${tech.name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].experiencia&color=${tech.color}&style=flat&label=%20&suffix=%25)\n![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${tech.color}&style=flat&logo=${tech.name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].usogithub&color=${tech.color}&style=flat&label=%20&suffix=%25)`
    )
}

// DELETE(se usa el revalidatePath aquí dentro, ya que no hay redirect())
// async function updateMd() {
//     await connectToDB();
//     try {
//         const proyectosDB: ILenguaje[] = await LenguajesModel.find();
//         const mdResponse = await octokit.repos.getContent({
//             owner,
//             repo,
//             path: path.md,
//             ref,
//         });

//         let mdSha;
//         if (Array.isArray(mdResponse.data)) {
//             const mdFile = mdResponse.data.find((item) => item.name === "techs-test.md");
//             if (mdFile) {
//                 mdSha = mdFile.sha;
//                 // try {
//                 //     revalidatePath("/admin/techs", "page");
//                 // } catch (error) {
//                 //     console.error("Error al revalidar la ruta:", error);
//                 // }
//             } else {
//                 throw new Error("El archivo .md no se encuentra en el repositorio");
//             }
//         } else {
//             mdSha = mdResponse.data.sha;
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

//         const encodedMdContent = Buffer.from(newMdContent).toString("base64");
//         await octokit.repos.createOrUpdateFileContents({
//             owner,
//             repo,
//             path: path.md,
//             message: "Actualizar archivo .md",
//             content: encodedMdContent,
//             sha: mdSha,
//             branch: ref,
//         });

//         console.log("Archivo .md actualizado correctamente");
//     } catch (error) {
//         console.error('Error actualizando el archivo .md:', error);
//         throw new Error('Error actualizando el archivo .md');
//     }
// }

async function updateMd() {
    await connectToDB();
    try {
        const proyectosDB: ILenguaje[] = await LenguajesModel.find();
        const filePath = path.md;
        const mdSha = await fetchFileSha(filePath);

        if (!mdSha) {
            throw new Error("El archivo .md no se encuentra en el repositorio");
        }

        let newMdContent = `# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
<p align="center">
<a href="#">
    <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
</a>
</p>\n\n\n***\n<br>\n\n`;

        proyectosDB.sort((a, b) => a.preferencia - b.preferencia).forEach((proyecto) => {
            newMdContent += `\n\n>- ## ${createBadgeTech(proyecto)}`
            if (proyecto.frameworks) {
                proyecto.frameworks.sort((a, b) => a.preferencia - b.preferencia);
                proyecto.frameworks.forEach((framework) => {
                    newMdContent += `\n\n> ### ${createBadgeTech(framework)}`;

                    if (framework.librerias) {
                        framework.librerias.sort((a, b) => a.preferencia - b.preferencia).forEach((libreria) => {
                            newMdContent += `\n> - #### ${createBadgeTech(libreria)}`;
                        });
                    }
                })
            }
        });

        await updateFileContent(filePath, "Actualizar archivo .md", newMdContent, mdSha);

        console.log("Archivo .md actualizado correctamente");
    } catch (error) {
        console.error('Error actualizando el archivo .md:', error);
        throw new Error('Error actualizando el archivo .md');
    }
}


async function doDelete (tipo:string, name:string) {
    console.log(`${tipo} ${name} eliminada correctamente`);
    await actualizarJson();
    console.log(`${tipo} ${name} eliminada correctamente del json`);
    await updateMd();
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

            // Eliminar la librería
            lenguaje.frameworks[frameworkIndex].librerias.splice(libreriaIndex, 1);

            proyectoActualizado = await lenguaje.save();
            if (proyectoActualizado) {
                const res = await doDelete("Librería", name);
                return res;
            }
        }

        // Buscar en frameworks
        lenguaje = await LenguajesModel.findOne({ "frameworks.name": name });
        if (lenguaje) {
            const frameworkIndex = lenguaje.frameworks.findIndex((fw:IFramework) => fw.name === name);

            // Eliminar el framework
            lenguaje.frameworks.splice(frameworkIndex, 1);

            proyectoActualizado = await lenguaje.save();
            if (proyectoActualizado) {
                const res = await doDelete("Framework", name);
                return res;
            }
        }

        // Buscar en lenguajes
        const lenguajeEliminado = await LenguajesModel.findOneAndDelete({ name: name });
        if (lenguajeEliminado) {
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