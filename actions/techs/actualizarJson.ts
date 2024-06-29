"use server"

import { Octokit } from "@octokit/rest";

import { connectToDB } from "@/utils/db-connect";
import { ILenguaje, LenguajesModel } from "@/models/lenguajes-schema";
import { flattenTechs, getGithubUsoByRange } from "@/utils/techs";
import { fetchFileSha, updateFileContent } from "./utils";


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

async function peticionRepos() {
    const reposDetails = await getRepoDetails();
    return calculateLanguagePercentages(reposDetails);
}

export async function actualizarJson() {
    await connectToDB();
    const proyectosDB: ILenguaje[] = await LenguajesModel.find();
    const jsonSha = await fetchFileSha(path.json);
    if (!jsonSha) {
        console.error("El archivo .json no se encuentra en el repositorio");
        return;
    }
    const lenguajePorcentaje = await peticionRepos();
    const getGithubPercentage = (name: string): number => {
        const replaceDashWithDot = (str: string) => str.replace(/-/g, '.');
        const usogithubString = lenguajePorcentaje.find(lenguaje => {
            const normalizedName = name.toLowerCase();
            const modifiedName = replaceDashWithDot(normalizedName);
            const searchedName = replaceDashWithDot(lenguaje.name.toLowerCase());
            return modifiedName === searchedName;
        })?.percentage.toFixed(2);
        return usogithubString !== undefined ? parseFloat(usogithubString) : 0;
    };
    const newJsonData = flattenTechs(proyectosDB).map(proyecto => {
        const { badge, color, isFw, isLib, preferencia, ...remainingProps } = proyecto;
        const porcentajeGithub = getGithubPercentage(proyecto.name);
        return { ...remainingProps, usogithub: porcentajeGithub, valueuso: getGithubUsoByRange(porcentajeGithub).value };
    });
    await updateFileContent(path.json, "Actualizar archivo .json", JSON.stringify(newJsonData, null, 2), jsonSha);
    console.log("Archivo Json actualizado");
}