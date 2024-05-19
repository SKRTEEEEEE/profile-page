"use server"

// import fs from "fs";
import { LenguajesModel } from "./models/lenguajes-schema";
import { Octokit } from "@octokit/rest";
import {  IFramework, IFrameworkForm, ILenguaje, ILenguajeForm, ILibreria, ILibreriaForm } from "./types";
import { flattenProyectos, getColorByRange } from "./utils/badges";

//Conexión github
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const owner = "SKRTEEEEEE";

const repo = "markdowns";

const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };
//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";


// const prefijo = { proyecto: "\n\n>- ## ", framework: "\n\n> ### ", lenguaje: "\n> - #### "}

// TEST para el CREATE triple
async function publicarJsonYMd(name: String, afinidad: number, badge: String, color: String, experiencia: number){
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
    const newJsonData = [...flattenProyectos(proyectosDB),
        //Nueva info
        { name, afinidad, value: getColorByRange(afinidad).value, experiencia, valueexp: getColorByRange(experiencia).value }];
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
    function createBadgeTech(tech: ILenguaje|IFramework|ILibreria){
        return(
            `${tech.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].value&label=Afinidad&color=${tech.color}&style=flat&logo=${tech.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].afinidad&color=${tech.color}&style=flat&label=%20&suffix=%25)\n![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].valueexp&label=Experiencia&color=${tech.color}&style=flat&logo=${tech.name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].experiencia&color=${tech.color}&style=flat&label=%20&suffix=%25)`
        )
    }
    // Actualizar el archivo .md en el repositorio de GitHub
    let newMdContent = 
`# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
<p align="center">
<a href="#">
    <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
</a>
</p>\n\n\n***\n<br>\n\n`
//Nuevo lenguaje 
newMdContent += `>- ## ${badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].value&label=Afinidad&color=${color}&style=flat&logo=${name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].afinidad&color=${color}&style=flat&label=%20&suffix=%25)\n![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].valueexp&label=Experiencia&color=${color}&style=flat&logo=${name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].experiencia&color=${color}&style=flat&label=%20&suffix=%25)\n>\n>![New Badge](https://img.shields.io/badge/%C2%A1_novedad_%F0%9F%91%8D_!-NEW_%F0%9F%93%A5_%F0%9F%97%92%EF%B8%8F-blue?style=social)
\n\n`;
proyectosDB.sort((a,b)=> a.preferencia - b.preferencia).forEach((proyecto) => {
    newMdContent += `\n\n>- ## ${createBadgeTech(proyecto)}`
    if(proyecto.frameworks){
        proyecto.frameworks.sort((a, b) => a.preferencia - b.preferencia);
        proyecto.frameworks.forEach((framework) => {
            newMdContent += `\n\n> ### ${createBadgeTech(framework)}`; 

            if (framework.librerias) {
                framework.librerias.sort((a,b)=>a.preferencia - b.preferencia).forEach((libreria) => {
                    newMdContent += `\n> - #### ${createBadgeTech(libreria)}`;
                });}
        })
    }   
})


const encodedMdContent = Buffer.from(newMdContent).toString("base64");
await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: path.md,
    message: "Actualizar archivo .md",
    content: encodedMdContent,
    sha: mdSha,
    branch: ref,
})
}

export async function publicarProyecto({name , afinidad, badge, preferencia, color, experiencia}:ILenguajeForm) {
    // Parte datos hardcodd
    // const name: String = "Node.js";
    // const afinidad: number = 75;
    // const badge: String = "[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)";
    // const preferencia: number = 3
    // const color: string = "339933"
    // const experiencia: number = 70;
    // PARTE GITHUB
   publicarJsonYMd(name, afinidad, badge, color,experiencia);
    // PARTE SUBIR A LA BDD
  const nuevoProyecto = new LenguajesModel({
    name,
    afinidad,
    badge,
    preferencia,
    color,
    experiencia
  });

  try {
    const proyectoGuardado = await nuevoProyecto.save();
    console.log("Proyecto guardado correctamente:", proyectoGuardado);
  } catch (error) {
    console.error(error);
  }

  console.log("Archivos actualizados en el repositorio de GitHub");
}
export async function publicarFwATech({name , afinidad, badge, preferencia, color, experiencia, lenguajeTo}:IFrameworkForm){
// const name = "Express";
// const afinidad = 70;
// const badge = "[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)";
// const preferencia = 2;
// const color = "000000"
// const experiencia: number = 60;
try{
    const lenguaje = await LenguajesModel.findOne({ name: lenguajeTo });
    if (lenguaje){
        publicarJsonYMd(name, afinidad, badge, color, experiencia);
        const nuevoFramework = {
            name,
            afinidad,
            badge,
            preferencia,
            color,
            experiencia
        }
        lenguaje.frameworks.push(nuevoFramework)
        await lenguaje.save();
        console.log("Framework agregado correctamente:", nuevoFramework);
    }else{
        console.log("Lenguaje no encontrado");
    } 
} catch (error) {
    console.error('Error al agregar la framework:', error);
}
}
export async function publicarLibAFw({name , afinidad, badge, preferencia, color, experiencia, lenguajeTo, frameworkTo}: ILibreriaForm){
// const name = "NextUI";
// const afinidad = 65;
// const badge = "[![NextUI Badge](https://img.shields.io/badge/NextUI-7928CA.svg?style=for-the-badge&logo=nextui&logoColor=white)](https://nextui.org/)";
// const preferencia = 1;
// const color = "7928CA"
// const experiencia: number = 70;
try{
    const lenguaje = await LenguajesModel.findOne({ name: lenguajeTo });
    if (lenguaje){
        const framework = lenguaje.frameworks.find((framework:IFramework) => framework.name === frameworkTo);
        if(framework){
            publicarJsonYMd(name, afinidad, badge, color, experiencia);
            const nuevaLibreria = {
                name,
                afinidad,
                badge,
                preferencia,
                color,
                experiencia
            }
            framework.librerias.push(nuevaLibreria)
            await lenguaje.save();
            console.log("Libreria agregada correctamente:", nuevaLibreria);

        }else{
            console.error("Framework no encontrado en la bdd", "Next.js")
        }
    }else{
        console.error("Lenguaje no encontrado en la bdd", "Node.js")
    }
}catch (error) {
    console.error("Error al agregar la libreria: ", error)
}
}
export async function testPeticionRepos(){
    const {data: repos} = await octokit.repos.listForUser({
        username: owner,
        per_page: 100,
    })
    // console.log("repositorios: ",repos)
    const reposDetails = await Promise.all(repos.map(async (repo) => {
        const { data: repoDetails } = await octokit.repos.get({
          owner,
          repo: repo.name
        });
  
        const { data: languages } = await octokit.repos.listLanguages({
          owner,
          repo: repo.name
        });
  
        return {
          name: repo.name,
          size: repoDetails.size, // El tamaño está en KB
          languages: Object.keys(languages),
          topics: repoDetails.topics,
          html_url: repoDetails.html_url, // URL del repositorio
            description: repoDetails.description // Descripción del repositorio
        };
      }));
      console.log("reposDetails: ", reposDetails);
}



