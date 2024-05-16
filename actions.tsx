"use server"

import fs from "fs";
import { LenguajesModel } from "./models/lenguajes-schema";
import { Octokit } from "@octokit/rest";
import {  IFramework, ILenguaje } from "./types";
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const owner = "SKRTEEEEEE";

const repo = "markdowns";

const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };
const prefijo = { proyecto: "\n\n>- ## ", framework: "\n\n> ### ", lenguaje: "\n> - #### "}

interface ColorAndValue {
    color: string;
    value: string;
}

//El color ya no se obtendrá de aquí sino que de la bdd, ya que depende del lenguaje al que pertenece el badge. Esto lo guardamos para un futuro en una posible card, etc..
function getColorByRange(numValue:number):ColorAndValue{
    let color: string;
    let value: string;
    if (numValue >= 80) {
        color="darkgreen";value="Máxima" // darkgreen para valores >= 80
    } else if (numValue >= 60) {
        color = "brightgreen";
        value = "Alta"; // brightgreen para valores >= 60 y < 80
    } else if (numValue >= 40) {
        color = "blue";
        value = "Moderada"; // "moderada" para valores >= 40 y < 60
    } else if (numValue >= 20) {
        color = "yellow";
        value = "Baja"; // "baja" para valores >= 20 y < 40
    } else {
        color = "red";
        value = "Mínima"; // "minima" para valores < 20
    }
    return { color, value };
}

//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";
const flattenProyectos = (proyectos: ILenguaje[]) => {
    let flattenedArray: { name: string; afinidad: number; value: string }[] = [];

    proyectos.forEach((proyecto) => {
        flattenedArray.push({
            name: proyecto.name,
            afinidad: proyecto.afinidad,
            value: getColorByRange(proyecto.afinidad).value
        });

        proyecto.frameworks?.forEach((framework) => {
            flattenedArray.push({
                name: framework.name,
                afinidad: framework.afinidad,
                value: getColorByRange(framework.afinidad).value
            });

            framework.librerias?.forEach((libreria) => {
                flattenedArray.push({
                    name: libreria.name,
                    afinidad: libreria.afinidad,
                    value: getColorByRange(libreria.afinidad).value
                });
            });
        });
    });

    return flattenedArray;
};


// TEST para el CREATE triple
async function publicarJsonYMd(name: String, afinidad: number, badge: String, color: String){
    // Obtener todos los proyectos de la base de datos
    const proyectosDB: ILenguaje[] = await LenguajesModel.find();

    // PARTE .JSON (GITHUB)
    // HAY QUE HACER QUE GUARDE LOS FRAMEWORKS Y LIBRERIAS TMB
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
        { name, afinidad, value: getColorByRange(afinidad).value }];
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
    let newMdContent = 
`# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
<p align="center">
<a href="#">
    <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
</a>
</p>\n\n\n***\n<br>\n\n`
//Nuevo lenguaje
newMdContent += `>- ## ${badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].value&label=Afinidad&color=${color}&style=flat&logo=${name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].afinidad&color=${color}&style=flat&label=%20&suffix=%25)\n>\n>![Static Badge](https://img.shields.io/badge/%C2%A1_novedad_%F0%9F%91%8D_!-NEW_%F0%9F%93%A5_%F0%9F%97%92%EF%B8%8F-blue?style=social)
\n\n`;
proyectosDB.sort((a,b)=> a.preferencia - b.preferencia).forEach((proyecto) => {
    newMdContent += `\n\n>- ## ${proyecto.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${proyecto.name}')].value&label=Afinidad&color=${proyecto.color}&style=flat&logo=${proyecto.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${proyecto.name}')].afinidad&color=${proyecto.color}&style=flat&label=%20&suffix=%25)`;
    if(proyecto.frameworks){
        proyecto.frameworks.sort((a, b) => a.preferencia - b.preferencia);
        proyecto.frameworks.forEach((framework) => {
            newMdContent += `\n\n> ### ${framework.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${framework.name}')].value&label=Afinidad&color=${framework.color}&style=flat&logo=${framework.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${framework.name}')].afinidad&color=${framework.color}&style=flat&label=%20&suffix=%25)`; 

            if (framework.librerias) {
                framework.librerias.sort((a,b)=>a.preferencia - b.preferencia).forEach((libreria) => {
                    newMdContent += `\n> - #### ${libreria.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${libreria.name}')].value&label=Afinidad&color=${libreria.color}&style=flat&logo=${libreria.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${libreria.name}')].afinidad&color=${libreria.color}&style=flat&label=%20&suffix=%25)`;
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



//TEST para el archivo y la estructura MD
// async function publicarMdServer(name: String, badge: String, color: String){
//     // const proyectosDB: ILenguaje[] = await LenguajesModel.find();
//     //HARDCDD data
//     const proyectosDB = [
//         {
//             name: "Javascript",
//             preferencia: 1,
//             badge: "[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)",
//             color: "darkgreen",
//             frameworks: [
//                 {
//                     name: "react",
//                     preferencia: 1,
//                     badge: "[![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/learn)",
//                     color: "blue",
//                     librerias: [
//                         {
//                             name: "Chakra-UI",
//                             preferencia: 1,
//                             badge: "[![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=Chakra-UI&logoColor=white)](https://chakra-ui.com/)",
//                             afinidad: "Baja",
//                             color: "yellow"
//                         },
//                         {
//                             name: "React-Icons",
//                             preferencia: 2,
//                             badge: "[![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge)](https://react-icons.github.io/react-icons/)",
//                             afinidad: "Máxima",
//                             color: "darkgreen"
//                         }
//                     ]
//                 },
//                 {
//                     name: "Node.js",
//                     preferencia: 3,
//                     badge: "[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)",
//                     color: "brightgreen"
//                 },
//                 {
//                     name: "Next.js",
//                     preferencia: 2,
//                     badge: "[![Next.js](https://img.shields.io/badge/Next.js-%23111111.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/docs)",
//                     color: "darkgreen",
//                     librerias: [
//                         {
//                             name: "NextUI",
//                             preferencia: 1,
//                             badge: "[![NextUI](https://img.shields.io/badge/NextUI-7928CA.svg?style=for-the-badge&logo=nextui&logoColor=white)](https://nextui.org/)",
//                             afinidad: "Alta",
//                             color: "brightgreen"
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             name: "CSS",
//             preferencia: 2,
//             badge: "[![CSS](https://img.shields.io/badge/-CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)",
//             color: "blue",
//             frameworks: [
//                 {
//                     name: "Tailwind CSS",
//                     preferencia: 1,
//                     badge: "[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%231a202c.svg?style=for-the-badge&logo=tailwind-css&logoColor=38b2ac)](https://tailwindcss.com/)",
//                     color: "brightgreen"
//                 },
//                 {
//                     name: "Styled Components",
//                     preferencia: 2,
//                     badge: "[![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)",
//                     color: "blue"
//                 }
//             ]
//         }
//         // Agrega más tecnologías aquí con sus frameworks y librerías asociadas
//     ];


//     // Actualizar el archivo .md en el repositorio de GitHub
//     let newMdContent = 
// `# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
// <p align="center">
// <a href="#">
//     <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
// </a>
// </p>\n\n\n***\n\n<br>\n\n`
// proyectosDB.sort((a,b)=> a.preferencia - b.preferencia).forEach((proyecto) => {
//     newMdContent += `\n\n>- ## ${proyecto.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${proyecto.name}')].value&label=Afinidad&color=${proyecto.color}&style=flat&logo=${proyecto.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${proyecto.name}')].afinidad&color=${proyecto.color}&style=flat&label=%20&suffix=%25)`;
//     if(proyecto.frameworks){
//         proyecto.frameworks.sort((a, b) => a.preferencia - b.preferencia);
//         proyecto.frameworks.forEach((framework) => {
//             newMdContent += `\n\n> ### ${framework.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${framework.name}')].value&label=Afinidad&color=${framework.color}&style=flat&logo=${framework.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${framework.name}')].afinidad&color=${framework.color}&style=flat&label=%20&suffix=%25)`; 

//             if (framework.librerias) {
//                 framework.librerias.sort((a,b)=>a.preferencia - b.preferencia).forEach((libreria) => {
//                     newMdContent += `\n> - #### ${libreria.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${libreria.name}')].value&label=Afinidad&color=${libreria.color}&style=flat&logo=${libreria.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${libreria.name}')].afinidad&color=${libreria.color}&style=flat&label=%20&suffix=%25)`;
//                 });}
//         })

//     }
    
// })
// // HAY QUE TERMINAR ESTO !!!!
// newMdContent += `- ## ${badge}\n\n![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].value&label=Afinidad&color=${color}&style=flat&logo=${name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].afinidad&color=${color}&style=flat&label=%20&suffix=%25)
// `;
//     const encodedMdContent = Buffer.from(newMdContent).toString("base64");
//     const filePath = 'data/techs.md'; // Especifica la ruta y name del archivo
//     fs.writeFile(filePath, encodedMdContent, 'base64', (err) => {
//         if (err) {
//             console.error('Error al escribir el archivo .md', err);
//         } else {
//             console.log('Archivo .md creado o sobrescrito con éxito en el servidor');
//         }
//     });
// }
// export async function publicarProyecto(){
//     // Parte datos hardcodd
//     const name: String = "Node.js";
//     // const afinidad: number = 80; -> No es necesario pq solo es para el .json
//     const badge: String = "[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)";
//     // const preferencia: number = 3 -> Ahora vamos a trabajar con esto
//     const color: string = "339933"
//     publicarMdServer(name,  badge, color)
// }
export async function publicarProyecto() {
    // Parte datos hardcodd
    const name: String = "Node.js";
    const afinidad: number = 75;
    const badge: String = "[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)";
    const preferencia: number = 3
    const color: string = "339933"
    // PARTE GITHUB
   publicarJsonYMd(name, afinidad, badge, color);
    // PARTE SUBIR A LA BDD
  const nuevoProyecto = new LenguajesModel({
    name,
    afinidad,
    badge,
    preferencia,
    color
  });

  try {
    const proyectoGuardado = await nuevoProyecto.save();
    console.log("Proyecto guardado correctamente:", proyectoGuardado);
  } catch (error) {
    console.error(error);
  }

  console.log("Archivos actualizados en el repositorio de GitHub");
}

export async function publicarFwATech(){
const name = "Express";
const afinidad = 100;
const badge = "[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)";
const preferencia = 2;
const color = "000000"
try{
    const lenguaje = await LenguajesModel.findOne({ name: 'Node.js' });
    if (lenguaje){
        publicarJsonYMd(name, afinidad, badge, color);
        const nuevoFramework = {
            name,
            afinidad,
            badge,
            preferencia,
            color
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
export async function publicarLibAFw(){
const name = "NextUI";
const afinidad = 65;
const badge = "[![NextUI Badge](https://img.shields.io/badge/NextUI-7928CA.svg?style=for-the-badge&logo=nextui&logoColor=white)](https://nextui.org/)";
const preferencia = 1;
const color = "7928CA"
try{
    const lenguaje = await LenguajesModel.findOne({ name: "Node.js" });
    if (lenguaje){
        const framework = lenguaje.frameworks.find((framework:IFramework) => framework.name === "Next.js");
        if(framework){
            publicarJsonYMd(name, afinidad, badge, color);
            const nuevaLibreria = {
                name,
                afinidad,
                badge,
                preferencia,
                color
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


