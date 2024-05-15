"use server"

// import fs from "fs";
import { LenguajesModel } from "./models/lenguajes-schema";
import { Octokit } from "@octokit/rest";
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const owner = "SKRTEEEEEE";

const repo = "markdowns";

const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };

//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";

export async function publicarProyecto() {
    // Parte datos hardcodd
    const name = "Express";
    const afinidad = 60;


    // Obtener todos los proyectos de la base de datos
    const proyectosDB = await LenguajesModel.find();

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

    // Actualizar el archivo .json en el repositorio de GitHub
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

    // // PARTE .JSON (SERVIDOR)

    // // Actualizar el archivo .json en el servidor
    // const filePath = "data/techs.json";
    // const newData = { name: 'Typescript',
    // afinidad: 90, };
    // //SOBRE ESCRIBE TANTO TECHS.JSON COMO EL .MD de markdowns
    // fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

    // // Obtener el contenido actualizado del archivo
    // const fileContent = fs.readFileSync(filePath, 'utf8');

    // // Codificar el contenido en base64
    // const encodedContent = Buffer.from(fileContent).toString('base64');


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
    const newMdContent = `# Tecnologías\n\n${proyectosDB.map((proyecto) => `- ${proyecto.name} (Afinidad: ${proyecto.afinidad})`).join('\n')}\n- Express (Afinidad: ${afinidad})`;
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
    // PARTE SUBIR A LA BDD
  const nuevoProyecto = new LenguajesModel({
    name,
    afinidad,
  });

  try {
    const proyectoGuardado = await nuevoProyecto.save();
    console.log("Proyecto guardado correctamente:", proyectoGuardado);
  } catch (error) {
    console.error(error);
  }

  console.log("Archivos actualizados en el repositorio de GitHub");
}



