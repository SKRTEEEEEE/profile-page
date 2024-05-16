import { ILenguaje } from "@/types";

interface ColorAndValue {
    color: string;
    value: string;
}

//El color ya no se obtendrá de aquí sino que de la bdd, ya que depende del lenguaje al que pertenece el badge. Esto lo guardamos para un futuro en una posible card, etc..
export function getColorByRange(numValue:number):ColorAndValue{
    let color: string;
    let value: string;
    if (numValue > 80) {
        color="darkgreen";value="Máxima" // darkgreen para valores >= 80
    } else if (numValue > 60) {
        color = "brightgreen";
        value = "Alta"; // brightgreen para valores >= 60 y < 80
    } else if (numValue > 40) {
        color = "blue";
        value = "Moderada"; // "moderada" para valores >= 40 y < 60
    } else if (numValue >= 20) {
        color = "yellow";
        value = "Baja"; // "baja" para valores >= 20 y < 40
    } else {
        color = "red";
        value = "Mínima"; // "minima" para valores < 20
    }
    return { color, value };
}

export const flattenProyectos = (proyectos: ILenguaje[]) => {
    let flattenedArray: { name: string; afinidad: number; value: string; experiencia: number; valueexp: string;  }[] = [];

    proyectos.forEach((proyecto) => {
        flattenedArray.push({
            name: proyecto.name,
            afinidad: proyecto.afinidad,
            value: getColorByRange(proyecto.afinidad).value,
            experiencia: proyecto.experiencia,
            valueexp: getColorByRange(proyecto.experiencia).value,
        });

        proyecto.frameworks?.forEach((framework) => {
            flattenedArray.push({
                name: framework.name,
                afinidad: framework.afinidad,
                value: getColorByRange(framework.afinidad).value,
                experiencia: framework.experiencia,
                valueexp: getColorByRange(framework.experiencia).value,
            });

            framework.librerias?.forEach((libreria) => {
                flattenedArray.push({
                    name: libreria.name,
                    afinidad: libreria.afinidad,
                    value: getColorByRange(libreria.afinidad).value,
                    experiencia: libreria.experiencia,
                    valueexp: getColorByRange(libreria.experiencia).value,
                });
            });
        });
    });

    return flattenedArray;
};