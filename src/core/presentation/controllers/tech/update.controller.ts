import { mongooseUpdateTechUC } from "@/core/application/usecases/entities/tech";
import { TechForm } from "@/core/domain/entities/tech";
import {  actualizarGithubTechsCMongoose, ActualizarGithubTechsType } from "./github.controller";

// FALTA TERMINAR EL UPDATE NUEVO - solo afinidad, experiencia, imagen, (web -futuro-) y descripciones

export async function updateTechCMongoose(updateData: TechForm) {
    try {
        let proyectoActualizado;
        if ('fwTo' in updateData) {
            // Actualizar librería
            proyectoActualizado = await mongooseUpdateTechUC(
                {filter:{ "frameworks.librerias.nameId": updateData.nameId },
                update:{
                    $set: {
                        // "frameworks.$[fw].librerias.$[lib].color": updateData.color,
                        
                        "frameworks.$[fw].librerias.$[lib].web": updateData.web,
                        "frameworks.$[fw].librerias.$[lib].afinidad": updateData.afinidad,
                        "frameworks.$[fw].librerias.$[lib].experiencia": updateData.experiencia,
                        "frameworks.$[fw].librerias.$[lib].img": updateData.img,
                        "frameworks.$[fw].librerias.$[lib].desc": updateData.desc,
                    }
                },
                options:{
                    arrayFilters: [
                        { "fw.librerias.nameId": updateData.nameId },
                        { "lib.nameId": updateData.nameId }
                    ],
                    new: true
                }}
            );
        } else if ('lengTo' in updateData) {
            // Actualizar framework
            proyectoActualizado = await mongooseUpdateTechUC(
              {filter:{ "frameworks.nameId": updateData.nameId },
                update:{
                    $set: {
                        "frameworks.$.web": updateData.web,
                        "frameworks.$.afinidad": updateData.afinidad,
                        // "frameworks.$.color": updateData.color,
                        "frameworks.$.experiencia": updateData.experiencia,
                        "frameworks.$.img": updateData.img,
                        "frameworks.$.desc": updateData.desc
                    }
                },
                options:{ new: true }}
            );
        } else {
            // Actualizar lenguaje
            proyectoActualizado = await mongooseUpdateTechUC(
                {filter:{ nameId: updateData.nameId },
                update:updateData,
                options:{ new: true }}
            );
        }

        if (!proyectoActualizado) {
            return handleError(`No se encontró un proyecto llamado ${updateData.nameId}.`);
        }
        await actualizarGithubTechsCMongoose({type: ActualizarGithubTechsType.JSON});
        return handleSuccess(`El proyecto ${updateData.nameId} ha sido actualizado correctamente.`);
    } catch (error) {
        console.error('Error actualizando el proyecto:', error);
        return handleError('Ocurrió un problema al intentar actualizar el proyecto. Por favor, intente de nuevo más tarde.');
    }
}

function handleError(message: string) {
    console.log(message);
    return { success: false, message: `Error: ${message}` };
}

function handleSuccess(message: string) {
    console.log(message);
    return { success: true, message: `Éxito: ${message}` };
}