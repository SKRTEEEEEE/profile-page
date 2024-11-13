"use server"

import { connectToDB } from "@/utils/db-connect";
import {  fetchFileSha, updateFileContent } from "./utils";
import { IFramework, ILenguaje, ILibreria, LenguajesModel } from "@/models/lenguajes-schema";

const owner = "SKRTEEEEEE";

const repo = "markdowns";

const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };
//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";

function createBadgeTech(tech: ILenguaje | IFramework | ILibreria) {
    return (
        `${tech.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.value&label=%F0%9F%92%97%20Afinidad&color=${tech.color}&style=flat&logo=${tech.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.afinidad&color=${tech.color}&style=flat&label=%20&suffix=%25)\n![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.valueexp&label=%F0%9F%8F%85%20Experiencia&color=${tech.color}&style=flat&logo=${tech.name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.experiencia&color=${tech.color}&style=flat&label=%20&suffix=%25)\n![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${tech.color}&style=flat&logo=${tech.name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.usogithub&color=${tech.color}&style=flat&label=%20&suffix=%25)`
    )
}

export async function actualizarMd(name: string, badge: string, color: string) {
    await connectToDB();
    try {
        const proyectosDB: ILenguaje[] = await LenguajesModel.find();
        const mdSha = await fetchFileSha(path.md);
        if (!mdSha) {
            throw new Error("El archivo .md no se encuentra en el repositorio");
        }
        let newMdContent = `# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
<p align="center">
<a href="#">
    <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
</a>
</p>\n\n\n***\n<br>\n\n`;

        newMdContent += `>- ## ${badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.value&label=%F0%9F%92%97%20Afinidad&color=${color}&style=flat&logo=${name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.afinidad&color=${color}&style=flat&label=%20&suffix=%25)
        ![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.valueexp&label=%F0%9F%8F%85%20Experiencia&color=${color}&style=flat&logo=${name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.experiencia&color=${color}&style=flat&label=%20&suffix=%25)
        ![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${color}&style=flat&logo=${name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.usogithub&color=${color}&style=flat&label=%20&suffix=%25)\n\n`;

        proyectosDB.sort((a, b) => a.preferencia - b.preferencia).forEach((proyecto) => {
            newMdContent += `\n\n>- ## ${createBadgeTech(proyecto)}`;
            if (proyecto.frameworks) {
                proyecto.frameworks.sort((a, b) => a.preferencia - b.preferencia);
                proyecto.frameworks.forEach((framework) => {
                    newMdContent += `\n\n> ### ${createBadgeTech(framework)}`;
                    if (framework.librerias) {
                        framework.librerias.sort((a, b) => a.preferencia - b.preferencia).forEach((libreria) => {
                            newMdContent += `\n> - #### ${createBadgeTech(libreria)}`;
                        });
                    }
                });
            }
        });

        await updateFileContent(path.md, "Actualizar archivo .md", newMdContent, mdSha);
        console.log("Archivo Markdown actualizado");
    } catch (error) {
        console.error("Error actualizando el archivo .md:", error);
    }
}