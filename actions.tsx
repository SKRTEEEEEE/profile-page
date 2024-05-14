"use server"

import { LenguajesModel } from "./models/lenguajes-schema";

export async function publicarProyecto() {
    const nuevoProyecto = new LenguajesModel({  
        name: 'Typescript',
        afinidad: 4,
      });

    try {
        const proyectoGuardado = await nuevoProyecto.save();
        console.log("Proyecto guardado correctamente:", proyectoGuardado);
    } catch (error) {
        console.error("Error al guardar el proyecto:", error);
    }
  }