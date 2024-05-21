"use server"

import fs from "fs";
import { LenguajesModel } from "../models/lenguajes-schema";
import { Octokit } from "@octokit/rest";
import { IFramework, IFrameworkForm, IJsonTech, ILenguaje, ILenguajeForm, ILibreria, ILibreriaForm } from "../types";
import { flattenProyectos, getColorByRange, getGithubUsoByRange } from "../utils/badges";

interface RepoDetails {
    name: string;
    size: number;
    topics: string[];
    languages: string[];
    html_url: string;
    description: string | null;
}
interface LanguagePercentage {
    name: string;
    percentage: number;
}
//Conexión github
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const owner = "SKRTEEEEEE";

const repo = "markdowns";

const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };
//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";

function createBadgeTech(tech: ILenguaje | IFramework | ILibreria) {
    return (
        `${tech.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].value&label=%F0%9F%92%97%20Afinidad&color=${tech.color}&style=flat&logo=${tech.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].afinidad&color=${tech.color}&style=flat&label=%20&suffix=%25)\n![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].valueexp&label=%F0%9F%8F%85%20Experiencia&color=${tech.color}&style=flat&logo=${tech.name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].experiencia&color=${tech.color}&style=flat&label=%20&suffix=%25)\n![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${tech.color}&style=flat&logo=${tech.name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${tech.name}')].usogithub&color=${tech.color}&style=flat&label=%20&suffix=%25)`
    )
}
// const prefijo = { proyecto: "\n\n>- ## ", framework: "\n\n> ### ", lenguaje: "\n> - #### "}

// async function actualizarJson(name: String, afinidad: number, experiencia: number) {
//     // Obtener todos los proyectos de la base de datos
//     const proyectosDB: ILenguaje[] = await LenguajesModel.find();

//     // Obtener el contenido del archivo .json existente en el repositorio de GitHub
//     const jsonResponse = await octokit.repos.getContent({
//         owner,
//         repo,
//         path: path.json,
//         ref,
//     });
//     let jsonSha;
//     if (Array.isArray(jsonResponse.data)) {
//         const jsonFile = jsonResponse.data.find((item) => item.name === "techs-test.json");
//         if (jsonFile) {
//             jsonSha = jsonFile.sha;
//         } else {
//             console.error("El archivo .json no se encuentra en el repositorio");
//             return;
//         }
//     } else {
//         jsonSha = jsonResponse.data.sha;
//     }


//     // Actualizar el archivo .json en el repositorio de GitHub (Solo para los badges)
//     // Generar el nuevo contenido del archivo .json
//     const lenguajePorcentaje = await testPeticionRepos();

//     const getGithubPercentage = (name: String) => {

//         const replaceDashWithDot = (str: string) => str.replace(/-/g, '.');
//         const usogithubString = lenguajePorcentaje.find(lenguaje => {
//             const normalizedName = name.toLowerCase();
//             const modifiedName = replaceDashWithDot(normalizedName);
//             const searchedName = replaceDashWithDot(lenguaje.name.toLowerCase());
//             return modifiedName === searchedName;
//         })?.percentage.toFixed(2);
//         const usogithub = usogithubString !== undefined ? parseFloat(usogithubString) : 0;

//         return usogithub;
//     }; const usogithub = getGithubPercentage(name)
//     const newJsonData = [
//         ...flattenProyectos(proyectosDB).map(proyecto => {

//             const porcentajeGithub = getGithubPercentage(proyecto.name);
//             return { ...proyecto, usogithub: porcentajeGithub, valueuso: getGithubUsoByRange(porcentajeGithub).value };
//         }),
//         {
//             name,
//             afinidad,
//             value: getColorByRange(afinidad).value,
//             experiencia,
//             valueexp: getColorByRange(experiencia).value,
//             usogithub,
//             valueuso: getGithubUsoByRange(usogithub).value
//         }
//     ];



//     const encodedJsonContent = Buffer.from(JSON.stringify(newJsonData, null, 2)).toString("base64");
//     await octokit.repos.createOrUpdateFileContents({
//         owner,
//         repo,
//         path: path.json,
//         message: "Actualizar archivo .json",
//         content: encodedJsonContent,
//         sha: jsonSha,
//         branch: ref,
//     });
// }
async function actualizarJson(name: string, afinidad: number, experiencia: number) {
    // Obtener todos los proyectos de la base de datos
    const proyectosDB: ILenguaje[] = await LenguajesModel.find();
    const techsTemp = flattenProyectos(proyectosDB).map(proyecto => ({
        name: proyecto.name,
        afinidad: proyecto.afinidad,
        experiencia: proyecto.experiencia
    }));

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

    // Actualizar el archivo .json en el repositorio de GitHub
    const lenguajePorcentaje = await testPeticionRepos();

    const getGithubPercentage = (name: string) => {
        const replaceDashWithDot = (str: string) => str.replace(/-/g, '.');
        const usogithubString = lenguajePorcentaje.find(lenguaje => {
            const normalizedName = name.toLowerCase();
            const modifiedName = replaceDashWithDot(normalizedName);
            const searchedName = replaceDashWithDot(lenguaje.name.toLowerCase());
            return modifiedName === searchedName;
        })?.percentage.toFixed(2);
        const usogithub = usogithubString !== undefined ? parseFloat(usogithubString) : 0;

        return usogithub;
    }; 
    // const usogithub = getGithubPercentage(name);

    // Crear un nuevo objeto con la información del proyecto actualizado o nuevo
    const proyectoActualizado = {
        name,
        afinidad,

        experiencia,
    };

    // Verificar si ya existe un proyecto con el mismo nombre en la base de datos
    const existingProjectIndex = proyectosDB.findIndex(proyecto => proyecto.name == name);
    console.log("existingProjectIndex: ", existingProjectIndex)
    console.log("proyectoActualizado: ", proyectoActualizado);
    
    if (existingProjectIndex !== -1) {
        // Si existe, actualizar el proyecto en la lista de proyectos
        techsTemp[existingProjectIndex] = proyectoActualizado;
    } else {
        // Si no existe, agregar el nuevo proyecto a la lista de proyectos
        techsTemp.push(proyectoActualizado);
    }
    console.log("techsTemp: ", techsTemp); 
    // // Generar el nuevo contenido del archivo .json
    const newJsonData = techsTemp.map(proyecto => {
        const porcentajeGithub = getGithubPercentage(proyecto.name.toString());
        return { ...proyecto,value: getColorByRange(proyecto.afinidad).value, valueexp: getColorByRange(proyecto.experiencia).value, usogithub: porcentajeGithub, valueuso: getGithubUsoByRange(porcentajeGithub).value };
    
    })
    // const newJsonData = flattenProyectos(proyectosDB).map(proyecto => {
    //     const porcentajeGithub = getGithubPercentage(proyecto.name);
    //     return { ...proyecto, usogithub: porcentajeGithub, valueuso: getGithubUsoByRange(porcentajeGithub).value };
    // });

    // Codificar el nuevo contenido del archivo .json
    const encodedJsonContent = Buffer.from(JSON.stringify(newJsonData, null, 2)).toString("base64");

    // Actualizar el archivo .json en el repositorio de GitHub
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: path.json,
        message: "Actualizar archivo .json",
        content: encodedJsonContent,
        sha: jsonSha,
        branch: ref,
    });
}

async function actualizarMd(name: String, badge: String, color: String) {
    // Obtener todos los proyectos de la base de datos
    const proyectosDB: ILenguaje[] = await LenguajesModel.find();
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
    newMdContent += `>- ## ${badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].value&label=%F0%9F%92%97%20Afinidad&color=${color}&style=flat&logo=${name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].afinidad&color=${color}&style=flat&label=%20&suffix=%25)
    ![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].valueexp&label=%F0%9F%8F%85%20Experiencia&color=${color}&style=flat&logo=${name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].experiencia&color=${color}&style=flat&label=%20&suffix=%25)
    ![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${color}&style=flat&logo=${name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].usogithub&color=${color}&style=flat&label=%20&suffix=%25)\n>\n>![New Badge](https://img.shields.io/badge/%C2%A1_novedad_%F0%9F%91%8D_!-NEW_%F0%9F%93%A5_%F0%9F%97%92%EF%B8%8F-blue?style=social)
\n\n`;
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
async function publicarJsonYMd(name: String, afinidad: number, badge: String, color: String, experiencia: number) {
    await actualizarJson(name, afinidad, experiencia);
    await actualizarMd(name, badge, color);
}
async function testPeticionRepos() {
    const { data: repos } = await octokit.repos.listForUser({
        username: owner,
        per_page: 100,
    })
    // console.log("repositorios: ",repos)
    // Falta tipar reposDetails
    const reposDetails: RepoDetails[] = await Promise.all(repos.map(async (repo) => {
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
            topics: repoDetails.topics || [],
            html_url: repoDetails.html_url, // URL del repositorio
            description: repoDetails.description // Descripción del repositorio
        };
    }));
    const reposDetailsLength = reposDetails.length;
    // Filtrar los repositorios que no tienen topics
    const filteredReposDetails = reposDetails.filter(repo => repo.topics.length > 0);
    const filteredReposLength = filteredReposDetails.length
    // Paso 2: Calcular el peso total de todos los repositorios
    const totalSize = filteredReposDetails.reduce((acc, repo) => acc + repo.size, 0);

    // Paso 3: Calcular el peso de cada lenguaje en función del tamaño del repositorio y el número de lenguajes en él
    const languageWeights: { [key: string]: number } = {};
    filteredReposDetails.forEach(repo => {
        const weightPerLanguage = repo.size / repo.topics.length;
        repo.topics.forEach(topic => {
            if (languageWeights[topic]) {
                languageWeights[topic] += weightPerLanguage;
            } else {
                languageWeights[topic] = weightPerLanguage;
            }
        });
    });

    // Paso 4: Calcular el porcentaje de uso de cada lenguaje
    const languagePercentages: { [key: string]: number } = {};
    for (const [language, weight] of Object.entries(languageWeights)) {
        languagePercentages[language] = (weight / totalSize) * 100;
    }
    function convertToLanguagePercentageArray(languageWeights: { [key: string]: number }): LanguagePercentage[] {
        const resultArray: LanguagePercentage[] = [];

        for (const [language, weight] of Object.entries(languageWeights)) {
            const languagePercentage: LanguagePercentage = {
                name: language,
                percentage: weight
            };
            resultArray.push(languagePercentage);
        }

        return resultArray;
    }
    // console.log("reposDetails: ", reposDetails);
    // console.log("filteredReposDetails: ", filteredReposDetails);
    // console.log("totalSize: ", totalSize);
    // console.log("languageWeights: ", languageWeights);
    console.log("languagePercentages: ", convertToLanguagePercentageArray(languagePercentages));
    // console.log("languagePercentages: ", languagePercentages);
    console.log("filteredTechsLength/reposDetailsLength: ", filteredReposLength, "/", reposDetailsLength)
    return convertToLanguagePercentageArray(languagePercentages)

}
//Create
export async function publicarLeng({ name, afinidad, badge, preferencia, color, experiencia }: ILenguajeForm) {

    publicarJsonYMd(name, afinidad, badge, color, experiencia);
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
export async function publicarFwALeng({ name, afinidad, badge, preferencia, color, experiencia, lenguajeTo }: IFrameworkForm) {
    try {
        const lenguaje = await LenguajesModel.findOne({ name: lenguajeTo });
        if (lenguaje) {
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
        } else {
            console.log("Lenguaje no encontrado", lenguajeTo);
        }
    } catch (error) {
        console.error('Error al agregar la framework:', error);
    }
}
export async function publicarLibAFw({ name, afinidad, badge, preferencia, color, experiencia, lenguajeTo, frameworkTo }: ILibreriaForm) {

    try {
        const lenguaje = await LenguajesModel.findOne({ name: lenguajeTo });
        if (lenguaje) {
            const framework = lenguaje.frameworks.find((framework: IFramework) => framework.name === frameworkTo);
            if (framework) {
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

            } else {
                console.error("Framework no encontrado en la bdd", frameworkTo)
            }
        } else {
            console.error("Lenguaje no encontrado en la bdd", lenguajeTo)
        }
    } catch (error) {
        console.error("Error al agregar la libreria: ", error)
    }
}

// Falta hacer el update en caso de que sea Fw o que sea Lib
type UpdateData = ILenguajeForm | IFrameworkForm | ILibreriaForm;
export async function updateTech(updateData:UpdateData){
    try {
        await actualizarJson(updateData.name, updateData.afinidad, updateData.experiencia)
        // let proyectoActualizado;
        // if ('lenguajeTo' in updateData) {
        //     console.log(`Actualizando lenguaje: ${updateData.lenguajeTo}`);
        //     const lenguaje = await LenguajesModel.findOne({ name: updateData.lenguajeTo });
        //     if (lenguaje) {

        //     }
            
        //   } else if ('frameworkTo' in updateData) {
        //     console.log(`Actualizando framework: ${updateData.frameworkTo}`);
        //   }else {
        //  proyectoActualizado = await LenguajesModel.findOneAndUpdate({ name: updateData.name }, updateData, {
        //     new: true, // Para que devuelva el documento actualizado
        //     runValidators: true // Para correr las validaciones definidas en el schema
        // });}
        const proyectoActualizado = await LenguajesModel.findOneAndUpdate({ name: updateData.name }, updateData, {
            new: true, // Para que devuelva el documento actualizado
            runValidators: true // Para correr las validaciones definidas en el schema
        });
        if (!proyectoActualizado) {
            console.log('No se encontró un proyecto con el nombre especificado. ', updateData.name);
        } else {
            console.log("Proyecto actualizado correctamente:", proyectoActualizado);
        }
    } catch (error) {
        console.error('Error actualizando el proyecto:', error);
    }
}




export async function actualizarJsonServerTest() {
    const name = "Markdown";
    const afinidad = 100;
    const experiencia = 90;
    try {
        // Obtener todos los proyectos de la base de datos
        const proyectosDB = await LenguajesModel.find();

        // Ruta al archivo .json en el servidor
        const filePath = 'data/techs.json';

        // Generar el nuevo contenido del archivo .json
        const lenguajePorcentaje = await testPeticionRepos();

        const getGithubPercentage = (name: String) => {

            const replaceDashWithDot = (str: string) => str.replace(/-/g, '.');
            const usogithubString = lenguajePorcentaje.find(lenguaje => {
                const normalizedName = name.toLowerCase();
                const modifiedName = replaceDashWithDot(normalizedName);
                const searchedName = replaceDashWithDot(lenguaje.name.toLowerCase());
                return modifiedName === searchedName;
            })?.percentage.toFixed(2);
            const usogithub = usogithubString !== undefined ? parseFloat(usogithubString) : 0;

            return usogithub;
        }; const usogithub = getGithubPercentage(name)
        const newJsonData = [
            ...flattenProyectos(proyectosDB).map(proyecto => {

                const porcentajeGithub = getGithubPercentage(proyecto.name);
                return { ...proyecto, usogithub: porcentajeGithub, valueuso: getGithubUsoByRange(porcentajeGithub).value, iconsuso: getGithubUsoByRange(porcentajeGithub).badge };
            }),
            {
                name,
                afinidad,
                value: getColorByRange(afinidad).value,
                experiencia,
                valueexp: getColorByRange(experiencia).value,
                usogithub,
                valueuso: getGithubUsoByRange(usogithub).value,
                iconsuso: getGithubUsoByRange(usogithub).badge
            }
        ];


        // Escribir el nuevo contenido en el archivo .json
        fs.writeFileSync(filePath, JSON.stringify(newJsonData, null, 2), 'utf-8');
        console.log('Archivo .json actualizado correctamente');
    } catch (error) {
        console.error('Error actualizando el archivo .json:', error);
    }
}
export async function actualizarMdServerTest() {
    const name = "Next.js";
    const badge = "[![Next.js](https://img.shields.io/badge/Next.js-%23111111.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/docs)";
    const color = "blue";

    try {
        // Obtener todos los proyectos de la base de datos
        const proyectosDB: ILenguaje[] = await LenguajesModel.find();

        // Ruta al archivo .md en el servidor
        const filePath = 'data/techs.md';

        // Generar el nuevo contenido del archivo .md
        let newMdContent =
            `# Tecnologías y Lenguajes de Programación
_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._

<p align="center">
<a href="#">
    <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
</a>
</p>

***

<br>

`;

        // Nuevo lenguaje
        newMdContent += `>- ## ${badge}
>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].value&label=Afinidad&color=${color}&style=flat&logo=${name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].afinidad&color=${color}&style=flat&label=%20&suffix=%25)
![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].valueexp&label=Experiencia&color=${color}&style=flat&logo=${name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].experiencia&color=${color}&style=flat&label=%20&suffix=%25)
![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${color}&style=flat&logo=${name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].usogithub&color=${color}&style=flat&label=%20&suffix=%25)
>
>![New Badge](https://img.shields.io/badge/%C2%A1_novedad_%F0%9F%91%8D_!-NEW_%F0%9F%93%A5_%F0%9F%97%92%EF%B8%8F-blue?style=social)

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

        // Escribir el nuevo contenido en el archivo .md
        fs.writeFileSync(filePath, newMdContent, 'utf-8');
        console.log('Archivo .md actualizado correctamente');
    } catch (error) {
        console.error('Error actualizando el archivo .md:', error);
    }
}