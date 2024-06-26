"use server"

// import { LenguajesModel } from "../models/lenguajes-schema";
import { Octokit } from "@octokit/rest";
import { IFramework, ILenguaje,  ILibreria } from "../../types";
// import { flattenProyectos, getGithubUsoByRange } from "../utils/badges";
// import { connectToDB } from "@/utils/db-connect";
// import { revalidatePath } from "next/cache";
// import { actualizarJson } from "./techs/actualizarJson";

// interface RepoDetails {
//     name: string;
//     size: number;
//     topics: string[];
//     languages: string[];
//     html_url: string;
//     description: string | null;
// }
// interface LanguagePercentage {
//     name: string;
//     percentage: number;
// }
//Conexión github
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const owner = "SKRTEEEEEE";

const repo = "markdowns";

// const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };
//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";

// function createBadgeTech(tech: ILenguaje | IFramework | ILibreria) {
//     return (
//         `${tech.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].value&label=%F0%9F%92%97%20Afinidad&color=${tech.color}&style=flat&logo=${tech.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].afinidad&color=${tech.color}&style=flat&label=%20&suffix=%25)\n![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].valueexp&label=%F0%9F%8F%85%20Experiencia&color=${tech.color}&style=flat&logo=${tech.name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].experiencia&color=${tech.color}&style=flat&label=%20&suffix=%25)\n![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${tech.color}&style=flat&logo=${tech.name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].usogithub&color=${tech.color}&style=flat&label=%20&suffix=%25)`
//     )
// }
// async function getRepoDetails() {
//     const { data: repos } = await octokit.repos.listForUser({
//         username: owner,
//         per_page: 100,
//     });
//     const reposDetails: RepoDetails[] = await Promise.all(repos.map(async (repo) => {
//         const { data: repoDetails } = await octokit.repos.get({
//             owner,
//             repo: repo.name
//         });
//         const { data: languages } = await octokit.repos.listLanguages({
//             owner,
//             repo: repo.name
//         });
//         return {
//             name: repo.name,
//             size: repoDetails.size,
//             languages: Object.keys(languages),
//             topics: repoDetails.topics || [],
//             html_url: repoDetails.html_url,
//             description: repoDetails.description
//         };
//     }));
//     return reposDetails;
// }

// function calculateLanguagePercentages(reposDetails: RepoDetails[]): LanguagePercentage[] {
//     const filteredReposDetails = reposDetails.filter(repo => repo.topics.length > 0);
//     const totalSize = filteredReposDetails.reduce((acc, repo) => acc + repo.size, 0);
//     const languageWeights: { [key: string]: number } = {};
//     filteredReposDetails.forEach(repo => {
//         const weightPerLanguage = repo.size / repo.topics.length;
//         repo.topics.forEach(topic => {
//             if (languageWeights[topic]) {
//                 languageWeights[topic] += weightPerLanguage;
//             } else {
//                 languageWeights[topic] = weightPerLanguage;
//             }
//         });
//     });
//     const languagePercentages: LanguagePercentage[] = [];
//     for (const [language, weight] of Object.entries(languageWeights)) {
//         languagePercentages.push({ name: language, percentage: (weight / totalSize) * 100 });
//     }
//     return languagePercentages;
// }

export async function fetchFileSha(filePath: string): Promise<string | undefined> {
    const response = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref,
    });
    if (Array.isArray(response.data)) {
        const file = response.data.find((item) => item.name === filePath.split('/').pop());
        return file?.sha;
    } else {
        return response.data.sha;
    }
}

export async function updateFileContent(filePath: string, message: string, content: string, sha: string) {
    const encodedContent = Buffer.from(content).toString("base64");
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message,
        content: encodedContent,
        sha,
        branch: ref,
    });
}

// async function peticionRepos() {
//     const reposDetails = await getRepoDetails();
//     return calculateLanguagePercentages(reposDetails);
// }


// export async function actualizarJson() {
//     await connectToDB();
//     const proyectosDB: ILenguaje[] = await LenguajesModel.find();
//     const jsonSha = await fetchFileSha(path.json);
//     if (!jsonSha) {
//         console.error("El archivo .json no se encuentra en el repositorio");
//         return;
//     }
//     const lenguajePorcentaje = await peticionRepos();
//     const getGithubPercentage = (name: string): number => {
//         const replaceDashWithDot = (str: string) => str.replace(/-/g, '.');
//         const usogithubString = lenguajePorcentaje.find(lenguaje => {
//             const normalizedName = name.toLowerCase();
//             const modifiedName = replaceDashWithDot(normalizedName);
//             const searchedName = replaceDashWithDot(lenguaje.name.toLowerCase());
//             return modifiedName === searchedName;
//         })?.percentage.toFixed(2);
//         return usogithubString !== undefined ? parseFloat(usogithubString) : 0;
//     };
//     const newJsonData = flattenProyectos(proyectosDB).map(proyecto => {
//         const { badge, color, isFw, isLib, preferencia, ...remainingProps } = proyecto;
//         const porcentajeGithub = getGithubPercentage(proyecto.name);
//         return { ...remainingProps, usogithub: porcentajeGithub, valueuso: getGithubUsoByRange(porcentajeGithub).value };
//     });
//     await updateFileContent(path.json, "Actualizar archivo .json", JSON.stringify(newJsonData, null, 2), jsonSha);
//     console.log("Archivo Json actualizado");
// }

// export async function actualizarMd(name: string, badge: string, color: string) {
//     await connectToDB();
//     try {
//         const proyectosDB: ILenguaje[] = await LenguajesModel.find();
//         const mdSha = await fetchFileSha(path.md);
//         if (!mdSha) {
//             throw new Error("El archivo .md no se encuentra en el repositorio");
//         }
//         let newMdContent = `# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
// <p align="center">
// <a href="#">
//     <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
// </a>
// </p>\n\n\n***\n<br>\n\n`;

//         newMdContent += `>- ## ${badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$[?(@.name=='${name}')].value&label=%F0%9F%92%97%20Afinidad&color=${color}&style=flat&logo=${name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$[?(@.name=='${name}')].afinidad&color=${color}&style=flat&label=%20&suffix=%25)
//         ![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$[?(@.name=='${name}')].valueexp&label=%F0%9F%8F%85%20Experiencia&color=${color}&style=flat&logo=${name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$[?(@.name=='${name}')].experiencia&color=${color}&style=flat&label=%20&suffix=%25)
//         ![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$[?(@.name=='${name}')].valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${color}&style=flat&logo=${name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$[?(@.name=='${name}')].usogithub&color=${color}&style=flat&label=%20&suffix=%25)\n\n`;

//         proyectosDB.sort((a, b) => a.preferencia - b.preferencia).forEach((proyecto) => {
//             newMdContent += `\n\n>- ## ${createBadgeTech(proyecto)}`;
//             if (proyecto.frameworks) {
//                 proyecto.frameworks.sort((a, b) => a.preferencia - b.preferencia);
//                 proyecto.frameworks.forEach((framework) => {
//                     newMdContent += `\n\n> ### ${createBadgeTech(framework)}`;
//                     if (framework.librerias) {
//                         framework.librerias.sort((a, b) => a.preferencia - b.preferencia).forEach((libreria) => {
//                             newMdContent += `\n> - #### ${createBadgeTech(libreria)}`;
//                         });
//                     }
//                 });
//             }
//         });

//         await updateFileContent(path.md, "Actualizar archivo .md", newMdContent, mdSha);
//         console.log("Archivo Markdown actualizado");
//     } catch (error) {
//         console.error("Error actualizando el archivo .md:", error);
//     }
// }

// // CREATE (se usa la funcion revalidateLenguajes en el "client")
// // Actualizar base de datos sin operaciones de archivo
// export async function publicarLeng({ name, afinidad, badge, preferencia, color, experiencia }: ILenguajeForm) {
//     await connectToDB();
//     const nuevoProyecto = new LenguajesModel({
//         name,
//         afinidad,
//         badge,
//         preferencia,
//         color,
//         experiencia
//     });

//     try {
//         const proyectoGuardado = await nuevoProyecto.save();
//         console.log("Proyecto guardado correctamente:", proyectoGuardado);
//         return { success: true, message: `Proyecto guardado correctamente en la BDD. Proyecto: ${nuevoProyecto.name}` };
//     } catch (error) {
//         console.error(error);
//         return { success: false, message: `Error al guardar el proyecto` };
//     }
// }

// export async function publicarFwALeng({ name, afinidad, badge, preferencia, color, experiencia, lenguajeTo }: IFrameworkForm) {
//     await connectToDB();
//     const nuevoFramework = {
//         name,
//         afinidad,
//         badge,
//         preferencia,
//         color,
//         experiencia
//     };
    
//     try {
//         const lenguaje = await LenguajesModel.findOne({ name: lenguajeTo });
//         if (lenguaje) {
//             lenguaje.frameworks.push(nuevoFramework);
//             await lenguaje.save();
//             console.log("Framework agregado correctamente:", nuevoFramework);
//             return { success: true, message: `Framework guardado correctamente en la BDD. Proyecto: ${nuevoFramework.name}` };
//         } else {
//             return { success: false, message: `Lenguaje no encontrado ${lenguajeTo}` };
//         }
//     } catch (error) {
//         console.error('Error al agregar el framework:', error);
//         return { success: false, message: `Error al guardar el proyecto` };
//     }
// }

// export async function publicarLibAFw({ name, afinidad, badge, preferencia, color, experiencia, lenguajeTo, frameworkTo }: ILibreriaForm) {
//     await connectToDB();
//     try {
//         const nuevaLibreria = {
//             name,
//             afinidad,
//             badge,
//             preferencia,
//             color,
//             experiencia
//         };

//         const lenguaje = await LenguajesModel.findOne({ name: lenguajeTo });
//         if (!lenguaje) {
//             return { success: false, message: `Lenguaje no encontrado: ${lenguajeTo}` };
//         }

//         const framework = lenguaje.frameworks.find((framework: IFramework) => framework.name === frameworkTo);
//         if (!framework) {
//             return { success: false, message: `Framework no encontrado en la base de datos: ${frameworkTo}` };
//         }

//         framework.librerias.push(nuevaLibreria);
//         await lenguaje.save();
//         console.log("Libreria agregada correctamente:", nuevaLibreria);

//         return { success: true, message: `Librería agregada correctamente: ${nuevaLibreria.name}` };
//     } catch (error) {
//         console.error("Error al agregar la librería: ", error);
//         return { success: false, message: `Error al agregar la librería` };
//     }
// }
// // UPDATE(se usa la funcion revalidateLenguajes en el "client")
// type UpdateData = ILenguajeForm | IFrameworkForm | ILibreriaForm;
// export async function updateTech(updateData: UpdateData) {
//     await connectToDB();
//     try {
//         let proyectoActualizado = null;

//         if ('frameworkTo' in updateData) {
//             // Es una librería, buscamos el lenguaje que contenga un framework con una librería con el nombre especificado
//             const lenguaje = await LenguajesModel.findOne({ "frameworks.librerias.name": updateData.name });
//             if (!lenguaje) {
//                 console.log('No se encontró ninguna librería con el nombre especificado:', updateData.name);
//                 return { success: false, message: `Error: No se encontró una librería llamada ${updateData.name} en ningún lenguaje registrado.` };
//             }

//             // Buscar el índice del framework que contenga la librería con el nombre especificado
//             const frameworkIndex = lenguaje.frameworks.findIndex((fw: IFramework) => 
//                 fw.librerias && fw.librerias.some((lib: ILibreria) => lib.name === updateData.name)
//             );

//             if (frameworkIndex === -1) {
//                 console.log('No se encontró ningún framework que contenga una librería con el nombre especificado:', updateData.name);
//                 return { success: false, message: `Error: No se encontró un framework que contenga la librería ${updateData.name}.` };
//             }

//             // Buscar el índice de la librería dentro del framework especificado
//             const libreriaIndex = lenguaje.frameworks[frameworkIndex].librerias.findIndex((lib: ILibreria) => lib.name === updateData.name);

//             if (libreriaIndex === -1) {
//                 console.log('No se encontró la librería dentro del framework especificado:', updateData.name);
//                 return { success: false, message: `Error: No se encontró la librería ${updateData.name} dentro del framework especificado.` };
//             }

//             // Actualizar la librería con los nuevos datos
//             lenguaje.frameworks[frameworkIndex].librerias[libreriaIndex] = updateData;

//             // Guardar los cambios
//             proyectoActualizado = await lenguaje.save();
//         } else if ('lenguajeTo' in updateData) {
//             // Es un framework, buscamos el lenguaje que contenga un framework con el nombre especificado
//             const lenguaje = await LenguajesModel.findOne({ "frameworks.name": updateData.name });
//             if (!lenguaje) {
//                 console.log('No se encontró ningún framework con el nombre especificado:', updateData.name);
//                 return { success: false, message: `Error: No se encontró un framework llamado ${updateData.name} en ningún lenguaje registrado.` };
//             }

//             // Buscar el índice del framework en el lenguaje
//             const frameworkIndex = lenguaje.frameworks.findIndex((fw: IFramework) => fw.name === updateData.name);

//             // Actualizar el framework con los nuevos datos
//             lenguaje.frameworks[frameworkIndex] = updateData;

//             // Guardar los cambios
//             proyectoActualizado = await lenguaje.save();
//         } else {
//             // Es un lenguaje, buscamos y actualizamos el lenguaje con el nombre especificado
//             proyectoActualizado = await LenguajesModel.findOneAndUpdate(
//                 { name: updateData.name },
//                 updateData,
//                 {
//                     new: true,
//                     runValidators: true
//                 }
//             );

//             if (!proyectoActualizado) {
//                 console.log('No se encontró el lenguaje con el nombre especificado:', updateData.name);
//                 return { success: false, message: `Error: No se encontró un lenguaje llamado ${updateData.name}.` };
//             }
//         }
//         //Comprobación para actualizar el json si se ha actualizado la bdd
//         if (!proyectoActualizado) {
//             console.log('No se encontró un proyecto con el nombre especificado:', updateData.name);
//             return { success: false, message: `Error: No se encontró un proyecto llamado ${updateData.name}.` };
//         } else {
//             await actualizarJson();
//             console.log("Proyecto actualizado correctamente:", proyectoActualizado);
//             return { success: true, message: `Éxito: El proyecto ${updateData.name} ha sido actualizado correctamente.` };
//         }
        
//     } catch (error) {
//         console.error('Error actualizando el proyecto:', error);
//         return { success: false, message: 'Error: Ocurrió un problema al intentar actualizar el proyecto. Por favor, intente de nuevo más tarde.' };
//     }
// }

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
// export async function deleteTech(name: string) {
//     await connectToDB();
//     try {
//         let proyectoActualizado = null;

//         // Buscar en librerías
//         let lenguaje = await LenguajesModel.findOne({ "frameworks.librerias.name": name });
//         if (lenguaje) {
//             const frameworkIndex = lenguaje.frameworks.findIndex((fw:IFramework) => fw.librerias?.some((lib:ILibreria) => lib.name === name));
//             const libreriaIndex = lenguaje.frameworks[frameworkIndex].librerias.findIndex((lib:ILibreria) => lib.name === name);

//             // Eliminar la librería
//             lenguaje.frameworks[frameworkIndex].librerias.splice(libreriaIndex, 1);

//             proyectoActualizado = await lenguaje.save();
//             if (proyectoActualizado) {
//                 console.log(`Librería ${name} eliminada correctamente`);
//                 await actualizarJson();
//                 console.log("fw eliminado del json");
//                 await updateMd();
//                 revalidatePath("/admin/techs")
//                 revalidatePath("/test/mongodb")
//                 return true;
//             }
//         }

//         // Buscar en frameworks
//         lenguaje = await LenguajesModel.findOne({ "frameworks.name": name });
//         if (lenguaje) {
//             const frameworkIndex = lenguaje.frameworks.findIndex((fw:IFramework) => fw.name === name);

//             // Eliminar el framework
//             lenguaje.frameworks.splice(frameworkIndex, 1);

//             proyectoActualizado = await lenguaje.save();
//             if (proyectoActualizado) {
//                 console.log(`Framework ${name} eliminado correctamente`);
//                 await actualizarJson();
//                 console.log("fw eliminado del json");
//                 await updateMd();
//                 revalidatePath("/admin/techs")
//                 revalidatePath("/test/mongodb")
//                 return true;
//             }
//         }

//         // Buscar en lenguajes
//         const lenguajeEliminado = await LenguajesModel.findOneAndDelete({ name: name });
//         if (lenguajeEliminado) {
//             console.log(`Lenguaje ${name} eliminado correctamente`);
//             await actualizarJson();
//             console.log("fw eliminado del json");
//             await updateMd();
//             revalidatePath("/admin/techs")
//             revalidatePath("/test/mongodb")
//             return true;
//         }

//         console.log(`No se encontró una tecnología con el nombre especificado: ${name}`);
//         return false;
//     } catch (error) {
//         // if (error instanceof Error) {
//         //     console.error('Error eliminando la tecnología:', error.message);
//         // } else {
//         //     console.error('Error eliminando la tecnología:', error);
//         // }
//         console.error('Error eliminando la tecnología:', error);
//         throw new Error('Error eliminando la tecnología');
//     }
// }