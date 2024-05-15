"use server"

import fs from "fs";
import { LenguajesModel } from "./models/lenguajes-schema";
import { Octokit } from "@octokit/rest";
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
const owner = "SKRTEEEEEE";

const repo = "markdowns";

const path = "sys/techs-test.md";

//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";

export async function publicarProyecto() {
    // Me esta guardando todo el model porque creo un nuevo objeto del modelo
    const nuevoProyecto = new LenguajesModel({  
        name: 'Typescript',
        afinidad: 60,
    });

    try {
        // Actualizar el archivo .json en el servidor
        const filePath = "data/techs.json";
        const newData = { name: 'Typescript',
        afinidad: 90, };
        //SOBRE ESCRIBE TANTO TECHS.JSON COMO EL .MD de markdowns
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    
        // Obtener el contenido actualizado del archivo
        const fileContent = fs.readFileSync(filePath, 'utf8');
    
        // Codificar el contenido en base64
        const encodedContent = Buffer.from(fileContent).toString('base64');
    
        // Obtener el SHA del archivo existente en el repositorio de GitHub
        const response = await octokit.repos.getContent({
          owner,
          repo,
          path,
          ref,
        });
    
        let sha;
        if (Array.isArray(response.data)) {
          // Si la respuesta es un array, significa que es un directorio, así que buscamos el archivo específico
          const file = response.data.find(item => item.name === 'archivo.json');
          if (file) {
            sha = file.sha;
          } else {
            console.error('El archivo no se encuentra en el repositorio');
            return;
          }
        } else {
          // Si la respuesta es un objeto, significa que es un archivo, así que tomamos el sha directamente
          sha = response.data.sha;
        }
    
        // Actualizar el archivo en el repositorio de GitHub
        await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path,
          message: "Actualizar archivo",
          content: encodedContent,
          sha,
          branch: ref,
        });
    
        console.log('Archivo actualizado en el servidor y en GitHub');
      } catch (error) {
        console.error(error);
      }
    };
    // try {
    //     const proyectoGuardado = await nuevoProyecto.save();
    //     console.log("Proyecto guardado correctamente:", proyectoGuardado);

    //     const filePath = "data/techs.json";
    //     let fileContent = [];

    //     // Leer el archivo existente
    //     if (fs.existsSync(filePath)) {
    //         const data = fs.readFileSync(filePath, 'utf8');
    //         fileContent = JSON.parse(data);
    //     }

    //     // Añadir el nuevo proyecto al array
    //     fileContent.push(proyectoGuardado);

    //     // Escribir el archivo con la nueva información
    //     fs.writeFile(filePath, JSON.stringify(fileContent, null, 2), (err) => {
    //         if (err) {
    //             console.error("Error al escribir el archivo:", err);
    //             return;
    //         }
    //         console.log("Archivo techs.json actualizado correctamente.");
    //     });
    // } catch (error) {
    //     console.error("Error al guardar el proyecto:", error);
    // }

