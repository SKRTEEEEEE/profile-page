"use server"

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const owner = "SKRTEEEEEE";

const repo = "markdowns";

//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";


export async function fetchFileSha(filePath: string): Promise<string | undefined> {
    const response = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref,
    });
    if (Array.isArray(response.data)) {
        const file = response.data.find((item) => item.name === filePath.split('/').pop());
        return file?.sha;
    } else {
        return response.data.sha;
    }
}

export async function updateFileContent(filePath: string, message: string, content: string, sha: string) {
    const encodedContent = Buffer.from(content).toString("base64");
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message,
        content: encodedContent,
        sha,
        branch: ref,
    });
}
