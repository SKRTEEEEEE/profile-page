"use server"

// import fs from "fs";
import { LenguajesModel } from "./models/lenguajes-schema";
import { Octokit } from "@octokit/rest";
import { Afinidad, ILenguaje } from "./types";
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const owner = "SKRTEEEEEE";

const repo = "markdowns";

const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };

const afinidadColores: Record<Afinidad, string> = {
    maxima: "darkgreen",
    alta: "brightgreen",
    moderada: "blue",
    baja: "yellow",
    minima: "red",

};

//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";
async function publicarJsonYMd(name: String, afinidad: Afinidad, web: String){
    // START
    // Obtener todos los proyectos de la base de datos
    const proyectosDB: ILenguaje[] = await LenguajesModel.find();

    // PARTE .JSON (GITHUB)
    // Obtener el contenido del archivo .json existente en el repositorio de GitHub
    const jsonResponse = await octokit.repos.getContent({
        owner,
        repo,
        path: path.json,
        ref,
    });

    let jsonSha;
    if (Array.isArray(jsonResponse.data)) {
        const jsonFile = jsonResponse.data.find((item) => item.name === "techs-test.json");
        if (jsonFile) {
            jsonSha = jsonFile.sha;
        } else {
            console.error("El archivo .json no se encuentra en el repositorio");
            return;
        }
    } else {
        jsonSha = jsonResponse.data.sha;
    }

    // Actualizar el archivo .json en el repositorio de GitHub (Solo para los badges)
    const newJsonData = [...proyectosDB.map((proyecto) => ({ name: proyecto.name, afinidad: proyecto.afinidad })), { name, afinidad }];
    const encodedJsonContent = Buffer.from(JSON.stringify(newJsonData, null, 2)).toString("base64");
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: path.json,
        message: "Actualizar archivo .json",
        content: encodedJsonContent,
        sha: jsonSha,
        branch: ref,
    });

    // PARTE .MD (GITHUB)

    // Obtener el SHA del archivo .md existente en el repositorio de GitHub
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
        } else {
            console.error("El archivo .md no se encuentra en el repositorio");
            return;
        }
    } else {
        mdSha = mdResponse.data.sha;
    }

    // Actualizar el archivo .md en el repositorio de GitHub
    const newMdContent = 
`# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
<p align="center">
<a href="#">
    <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
</a>
</p>\n\n\n***\n\n<br>\n\n${proyectosDB.map((proyecto) => {
const colorAfinidad = afinidadColores[proyecto.afinidad];
return(`- [![${proyecto.name}](https://img.shields.io/badge/-${proyecto.name}-F7DF1E?style=for-the-badge&logo=${proyecto.name.toLowerCase()}&logoColor=black)](${proyecto.web}) ![Afinidad ${proyecto.afinidad}](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${proyecto.name}')].afinidad&label=Afinidad&color=${colorAfinidad}&style=flat)`)})}\n
- [![${name}](https://img.shields.io/badge/-${name}-F7DF1E?style=for-the-badge&logo=${name.toLowerCase()}&logoColor=black)](${web}) ![Afinidad ${afinidad}](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].afinidad&label=Afinidad&color=blue&style=flat)
`;
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
    // FIN
}

export async function publicarProyecto() {
    // Parte datos hardcodd
    const name: String = "React";
    const afinidad: Afinidad = "moderada";
    const web: String = "https://react.dev/";
    // PARTE GITHUB
   publicarJsonYMd(name, afinidad, web);
    // PARTE SUBIR A LA BDD
  const nuevoProyecto = new LenguajesModel({
    name,
    afinidad,
    web
  });

  try {
    const proyectoGuardado = await nuevoProyecto.save();
    console.log("Proyecto guardado correctamente:", proyectoGuardado);
  } catch (error) {
    console.error(error);
  }

  console.log("Archivos actualizados en el repositorio de GitHub");
}



