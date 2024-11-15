
"use server"

import { connectToDB } from "@/core/infrastructure/connectors/mongo-db";
import { IFramework, ILenguaje, ILibreria, LenguajesModel } from "@/models/lenguajes-schema";
import { fetchFileSha, updateFileContent } from "./utils";
import { createBadgeTech } from "@/lib/techs";

const owner = "SKRTEEEEEE";

const repo = "markdowns";

const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };
//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";


export async function actualizarMd(name: string, badge: string, colorhash: string) {
    const color = colorhash.slice(1)
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
        ![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${color}&style=flat&logo=${name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.usogithub&color=${color}&style=flat&label=%20&suffix=%25)\n>\n>![New Badge](https://img.shields.io/badge/%C2%A1_novedad_%F0%9F%91%8D_!-NEW_%F0%9F%93%A5_%F0%9F%97%92%EF%B8%8F-blue?style=social)
`;

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