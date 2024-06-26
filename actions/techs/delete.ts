"use server"

import { LenguajesModel } from "@/models/lenguajes-schema";
import { revalidatePath } from "next/cache";
import { actualizarJson } from "./actualizarJson";
import { IFramework, ILenguaje, ILibreria } from "@/types";
import { connectToDB } from "@/utils/db-connect";
import { createBadgeTech } from "./utils";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const owner = "SKRTEEEEEE";

const repo = "markdowns";

const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };
//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";

// DELETE(se usa el revalidatePath aquí dentro, ya que no hay redirect())
async function updateMd() {
    await connectToDB();
    try {
        const proyectosDB: ILenguaje[] = await LenguajesModel.find();
        const mdResponse = await octokit.repos.getContent({
            owner,
            repo,
            path: path.md,
            ref,
        });

        let mdSha;
        if (Array.isArray(mdResponse.data)) {
            const mdFile = mdResponse.data.find((item) => item.name === "techs-test.md");
            if (mdFile) {
                mdSha = mdFile.sha;
                // try {
                //     revalidatePath("/admin/techs", "page");
                // } catch (error) {
                //     console.error("Error al revalidar la ruta:", error);
                // }
            } else {
                throw new Error("El archivo .md no se encuentra en el repositorio");
            }
        } else {
            mdSha = mdResponse.data.sha;
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

        const encodedMdContent = Buffer.from(newMdContent).toString("base64");
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: path.md,
            message: "Actualizar archivo .md",
            content: encodedMdContent,
            sha: mdSha,
            branch: ref,
        });

        console.log("Archivo .md actualizado correctamente");
    } catch (error) {
        console.error('Error actualizando el archivo .md:', error);
        throw new Error('Error actualizando el archivo .md');
    }
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
                console.log(`Librería ${name} eliminada correctamente`);
                await actualizarJson();
                console.log("fw eliminado del json");
                await updateMd();
                revalidatePath("/admin/techs")
                revalidatePath("/test/mongodb")
                return true;
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
                console.log(`Framework ${name} eliminado correctamente`);
                await actualizarJson();
                console.log("fw eliminado del json");
                await updateMd();
                revalidatePath("/admin/techs")
                revalidatePath("/test/mongodb")
                return true;
            }
        }

        // Buscar en lenguajes
        const lenguajeEliminado = await LenguajesModel.findOneAndDelete({ name: name });
        if (lenguajeEliminado) {
            console.log(`Lenguaje ${name} eliminado correctamente`);
            await actualizarJson();
            console.log("fw eliminado del json");
            await updateMd();
            revalidatePath("/admin/techs")
            revalidatePath("/test/mongodb")
            return true;
        }

        console.log(`No se encontró una tecnología con el nombre especificado: ${name}`);
        return false;
    } catch (error) {
        // if (error instanceof Error) {
        //     console.error('Error eliminando la tecnología:', error.message);
        // } else {
        //     console.error('Error eliminando la tecnología:', error);
        // }
        console.error('Error eliminando la tecnología:', error);
        throw new Error('Error eliminando la tecnología');
    }
}