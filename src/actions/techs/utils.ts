
"use server"

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const owner = "SKRTEEEEEE";

const repo = "markdowns";

//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";


export async function updateFileContent(filePath: string, message: string, content: string, sha: string, maxRetries = 3) {
    const encodedContent = Buffer.from(content).toString("base64");
    let currentTry = 0;
    let lastError;

    while (currentTry < maxRetries) {
        try {
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path: filePath,
                message,
                content: encodedContent,
                sha,
                branch: ref,
            });
            return; // Si tiene éxito, salimos de la función
        } catch (error: any) {
            lastError = error;
            
            // Si es un error 409 (conflicto), intentamos obtener el nuevo SHA
            if (error.status === 409) {
                console.log(`Intento ${currentTry + 1} fallido, obteniendo nuevo SHA...`);
                try {
                    const newSha = await fetchFileSha(filePath);
                    if (!newSha) {
                        throw new Error("No se pudo obtener el nuevo SHA");
                    }
                    sha = newSha; // Actualizamos el SHA para el siguiente intento
                } catch (shaError) {
                    console.error("Error obteniendo nuevo SHA:", shaError);
                    throw shaError;
                }
            } else {
                // Si no es un error 409, lanzamos el error inmediatamente
                throw error;
            }
        }
        currentTry++;
        
        // Pequeña pausa entre intentos para evitar sobrecarga
        if (currentTry < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    // Si llegamos aquí, hemos agotado todos los intentos
    throw lastError || new Error("No se pudo actualizar el archivo después de múltiples intentos");
}

// Función mejorada para obtener el SHA
export async function fetchFileSha(filePath: string): Promise<string | undefined> {
    try {
        const response = await octokit.repos.getContent({
            owner,
            repo,
            path: filePath,
            ref,
        });

        if (Array.isArray(response.data)) {
            const file = response.data.find((item) => item.name === filePath.split('/').pop());
            if (!file?.sha) {
                throw new Error(`No se encontró el SHA para el archivo ${filePath}`);
            }
            return file.sha;
        } else {
            if (!response.data.sha) {
                throw new Error(`No se encontró el SHA para el archivo ${filePath}`);
            }
            return response.data.sha;
        }
    } catch (error) {
        console.error(`Error obteniendo SHA para ${filePath}:`, error);
        throw error;
    }
}