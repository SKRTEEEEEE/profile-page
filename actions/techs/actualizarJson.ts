"use server"

import { Octokit } from "@octokit/rest";

import { connectToDB } from "@/utils/db-connect";
import { ILenguaje } from "@/types";
import { LenguajesModel } from "@/models/lenguajes-schema";
import { flattenProyectos, getGithubUsoByRange } from "@/utils/badges";


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


async function peticionRepos() {
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
    // console.log("languagePercentages: ", convertToLanguagePercentageArray(languagePercentages));
    // console.log("languagePercentages: ", languagePercentages);
    // console.log("filteredTechsLength/reposDetailsLength: ", filteredReposLength, "/", reposDetailsLength)
    return convertToLanguagePercentageArray(languagePercentages)

}
export async function actualizarJson() {
    await connectToDB()
    // Obtener todos los proyectos de la base de datos
    const proyectosDB: ILenguaje[] = await LenguajesModel.find();

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
    // Generar el nuevo contenido del archivo .json
    const lenguajePorcentaje = await peticionRepos();

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
    }; 
    // const usogithub = getGithubPercentage(name)
    const newJsonData = [
        ...flattenProyectos(proyectosDB).map(proyecto => {
            const { badge, color, isFw, isLib, preferencia, ...remainingProps } = proyecto;
            const porcentajeGithub = getGithubPercentage(proyecto.name);
            return { ...remainingProps, usogithub: porcentajeGithub, valueuso: getGithubUsoByRange(porcentajeGithub).value };
        })
        // ,
        // {
        //     name,
        //     afinidad,
        //     value: getColorByRange(afinidad).value,
        //     experiencia,
        //     valueexp: getColorByRange(experiencia).value,
        //     usogithub,
        //     valueuso: getGithubUsoByRange(usogithub).value
        // }
    ];



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
    console.log("Archivo Json actualizado")
}