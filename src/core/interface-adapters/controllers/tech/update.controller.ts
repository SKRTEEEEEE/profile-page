import { actualizarJson } from "@/core/interface-adapters/utils/tech/actualizarJson";
import { updateTechUC } from "@/core/application/usecases/entities/tech";
import { TechForm } from "@/core/domain/entities/Tech";



export async function updateTechC(updateData: TechForm) {
    try {
        let proyectoActualizado;
        if ('frameworkTo' in updateData) {
            // Actualizar librería
            proyectoActualizado = await updateTechUC(
                { "frameworks.librerias.name": updateData.name },
                {
                    $set: {
                        "frameworks.$[fw].librerias.$[lib].name": updateData.name,
                        "frameworks.$[fw].librerias.$[lib].preferencia": updateData.preferencia,
                        "frameworks.$[fw].librerias.$[lib].afinidad": updateData.afinidad,
                        "frameworks.$[fw].librerias.$[lib].badge": updateData.badge,
                        "frameworks.$[fw].librerias.$[lib].color": updateData.color,
                        "frameworks.$[fw].librerias.$[lib].experiencia": updateData.experiencia,
                        "frameworks.$[fw].librerias.$[lib].img": updateData.img,
                    }
                },
                {
                    arrayFilters: [
                        { "fw.librerias.name": updateData.name },
                        { "lib.name": updateData.name }
                    ],
                    new: true
                }
            );
        } else if ('lenguajeTo' in updateData) {
            // Actualizar framework
            proyectoActualizado = await updateTechUC(
                { "frameworks.name": updateData.name },
                {
                    $set: {
                        "frameworks.$.name": updateData.name,
                        "frameworks.$.preferencia": updateData.preferencia,
                        "frameworks.$.afinidad": updateData.afinidad,
                        "frameworks.$.badge": updateData.badge,
                        "frameworks.$.color": updateData.color,
                        "frameworks.$.experiencia": updateData.experiencia,
                        "frameworks.$.img": updateData.img
                    }
                },
                { new: true }
            );
        } else {
            // Actualizar lenguaje
            proyectoActualizado = await updateTechUC(
                { name: updateData.name },
                updateData,
                { new: true }
            );
        }

        if (!proyectoActualizado) {
            return handleError(`No se encontró un proyecto llamado ${updateData.name}.`);
        }

        await actualizarJson();
        return handleSuccess(`El proyecto ${updateData.name} ha sido actualizado correctamente.`);
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