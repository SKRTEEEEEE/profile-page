import { readAllTechsUC, updateTechUC } from "@/core/application/usecases/entities/tech";
import { TechForm } from "@/core/domain/entities/tech";
import { actualizarJson } from "../../utils/tech";

// FALTA TERMINAR EL UPDATE NUEVO - solo afinidad, experiencia, imagen, (web -futuro-) y descripciones

export async function updateTechC(updateData: TechForm) {
    try {
        let proyectoActualizado;
        if ('fwTo' in updateData) {
            // Actualizar librería
            proyectoActualizado = await updateTechUC(
                { "frameworks.librerias.name": updateData.nameId },
                {
                    $set: {
                        "frameworks.$[fw].librerias.$[lib].nameId": updateData.nameId,
                        "frameworks.$[fw].librerias.$[lib].nameBadge": updateData.nameBadge,
                        "frameworks.$[fw].librerias.$[lib].afinidad": updateData.afinidad,
                        // "frameworks.$[fw].librerias.$[lib].color": updateData.color,
                        "frameworks.$[fw].librerias.$[lib].experiencia": updateData.experiencia,
                        "frameworks.$[fw].librerias.$[lib].img": updateData.img,
                        "frameworks.$[fw].librerias.$[lib].desc": updateData.desc,
                    }
                },
                {
                    arrayFilters: [
                        { "fw.librerias.nameId": updateData.nameId },
                        { "lib.nameId": updateData.nameId }
                    ],
                    new: true
                }
            );
        } else if ('lengTo' in updateData) {
            // Actualizar framework
            proyectoActualizado = await updateTechUC(
                { "frameworks.nameId": updateData.nameId },
                {
                    $set: {
                        "frameworks.$.nameId": updateData.nameId,
                        "frameworks.$.nameBadge": updateData.nameBadge,
                        "frameworks.$.afinidad": updateData.afinidad,
                        // "frameworks.$.color": updateData.color,
                        "frameworks.$.experiencia": updateData.experiencia,
                        "frameworks.$.img": updateData.img,
                        "frameworks.$.desc": updateData.desc
                    }
                },
                { new: true }
            );
        } else {
            // Actualizar lenguaje
            proyectoActualizado = await updateTechUC(
                { nameId: updateData.nameId },
                updateData,
                { new: true }
            );
        }

        if (!proyectoActualizado) {
            return handleError(`No se encontró un proyecto llamado ${updateData.nameId}.`);
        }
        const proyectosDB = await readAllTechsUC()
        await actualizarJson(proyectosDB);
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