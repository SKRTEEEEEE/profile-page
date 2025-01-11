// ⚠️ HAY QUE TERMINAR ❗ - 11.01.2025

"use server"

import { Octokit } from "@octokit/rest";

import { flattenTechs, getGithubUsoByRange } from "@/lib/techs";
import { Fw, Leng, Lib } from "@/core/domain/entities/tech";
import { getTranslations } from "next-intl/server";
import { fetchFileSha, updateFileContent } from "@/actions/techs/utils";


type RepoDetails = {
    name: string;
    size: number;
    topics: string[];
    languages: string[];
    html_url: string;
    description: string | null;
}
type LanguagePercentage = {
    name: string;
    percentage: number;
}
//Conexión github
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const owner = "SKRTEEEEEE";


const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };

async function getRepoDetails() {
    const { data: repos } = await octokit.repos.listForUser({
        username: owner,
        per_page: 100,
    });
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
            size: repoDetails.size,
            languages: Object.keys(languages),
            topics: repoDetails.topics || [],
            html_url: repoDetails.html_url,
            description: repoDetails.description
        };
    }));
    return reposDetails;
}

function calculateLanguagePercentages(reposDetails: RepoDetails[]): LanguagePercentage[] {
    const filteredReposDetails = reposDetails.filter(repo => repo.topics.length > 0);
    const totalSize = filteredReposDetails.reduce((acc, repo) => acc + repo.size, 0);
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
    const languagePercentages: LanguagePercentage[] = [];
    for (const [language, weight] of Object.entries(languageWeights)) {
        languagePercentages.push({ name: language, percentage: (weight / totalSize) * 100 });
    }
    return languagePercentages;
}


export const getGithubPercentage = async (name: string): Promise<number> => {
    const reposDetails = await getRepoDetails();
    const lengPor = calculateLanguagePercentages(reposDetails);
    const replaceDashWithDot = (str: string) => str.replace(/-/g, '.');
    const usogithubString = lengPor.find(lenguaje => {
        const normalizedName = name.toLowerCase();
        const modifiedName = replaceDashWithDot(normalizedName);
        const searchedName = replaceDashWithDot(lenguaje.name.toLowerCase());
        return modifiedName === searchedName;
    })?.percentage.toFixed(2);
    return usogithubString !== undefined ? parseFloat(usogithubString) : 0;
};


type TechJsonData = {
    name: string;
    afinidad: number;
    value: string;
    experiencia: number;
    valueexp: string;
    usogithub: number;
    valueuso: string;
};
//AQUI EMPIEZA
export async function actualizarJson(proyectosDB: Leng[]) {
    const t = await getTranslations("ceo.info.section.slider")
    const jsonSha = await fetchFileSha(path.json);
    if (!jsonSha) {
        console.error("El archivo .json no se encuentra en el repositorio");
        return;
    }

    const newJsonData = flattenTechs(proyectosDB).reduce<{ [key: string]: TechJsonData }>((acc, proyecto) => {
        const lenguajeName = proyecto.nameId; // Nombre del lenguaje como clave

        // Crear el objeto con los datos correspondientes
        const languageData: TechJsonData = {
            name: lenguajeName,
            afinidad: proyecto.afinidad,
            value: t(`values.${proyecto.valueAfin}`),
            // value: proyecto.value,  
            experiencia: proyecto.experiencia,
            valueexp: t(`values.${(proyecto.valueExp)}`),
            // valueexp: proyecto.valueexp,  
            usogithub: proyecto.usoGithub,
            valueuso: getGithubUsoByRange(proyecto.usoGithub).value
        };

        // Asigna el objeto al acumulador utilizando el nombre del lenguaje como clave
        acc[lenguajeName] = languageData;

        return acc;
    }, {});



    await updateFileContent(path.json, "Actualizar archivo .json", JSON.stringify(newJsonData, null, 2), jsonSha);
    console.log("Archivo Json actualizado");
}


// ⚠️ HAY QUE TERMINAR ❗ - 11.01.2025



const repo = "markdowns";

//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";


export async function actualizarMd(proyectosDB: Leng[]|null, create?:{name: string, badge: string, colorhash: string}) {
    const color = create?.colorhash.slice(1)
    try {
        const mdSha = await fetchFileSha(path.md);
        if (!mdSha) {
            throw new Error("El archivo .md no se encuentra en el repositorio");
        }
        let newMdContent = `# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
<p align="center">
<a href="#">
    <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
</a>
</p>\n\n\n***\n\n\n`;
        if(create){
            const{name, badge} = create
            newMdContent += `>- ## ${badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.value&label=%F0%9F%92%97%20Afinidad&color=${color}&style=flat&logo=${name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.afinidad&color=${color}&style=flat&label=%20&suffix=%25)
        ![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.valueexp&label=%F0%9F%8F%85%20Experiencia&color=${color}&style=flat&logo=${name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.experiencia&color=${color}&style=flat&label=%20&suffix=%25)
        ![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${color}&style=flat&logo=${name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${name}.usogithub&color=${color}&style=flat&label=%20&suffix=%25)\n>\n>![New Badge](https://img.shields.io/badge/%C2%A1_novedad_%F0%9F%91%8D_!-NEW_%F0%9F%93%A5_%F0%9F%97%92%EF%B8%8F-blue?style=social)
`;
        }
        

        proyectosDB?.sort((a, b) => a.preferencia - b.preferencia).forEach((proyecto) => {
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

export function createBaseBadge(tech: Lib | Leng | Fw){
    const color = tech.color.slice(1)
    return(
        `[![${tech.nameId}](https://img.shields.io/badge/${tech.nameId}-${color}?style=for-the-badge&logo=${tech.nameBadge})](${tech.web})`
    )
}

export function createBadgeTech(tech: Lib | Leng | Fw) {
    const color = tech.color.slice(1)
    console.log("color: ", color)
    return (
        `${createBaseBadge(tech)}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.nameId}.value&label=%F0%9F%92%97%20Afinidad&color=${color}&style=flat&logo=${tech.nameBadge})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.nameId}.afinidad&color=${color}&style=flat&label=%20&suffix=%25)\n![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.nameId}.valueexp&label=%F0%9F%8F%85%20Experiencia&color=${color}&style=flat&logo=${tech.nameBadge})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.nameId}.experiencia&color=${color}&style=flat&label=%20&suffix=%25)\n![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.nameId}.valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${color}&style=flat&logo=${tech.nameBadge})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.nameId}.usogithub&color=${color}&style=flat&label=%20&suffix=%25)`
    )
}