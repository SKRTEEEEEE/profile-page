import { FullTechData, Fw, Leng,  Lib } from "@/core/domain/entities/tech";

type BadgeAndValue = {
    badge: string;
    value: string;
}

//El badge ya no se obtendrá de aquí sino que de la bdd, ya que depende del lenguaje al que pertenece el badge. Esto lo guardamos para un futuro en una posible card, etc..
export function getColorByRange(numValue:number):BadgeAndValue{
    let badge: string;
    let value: string;
    if (numValue > 80) {
        badge="darkgreen";
        value="max" // darkgreen para valores >= 80
    } else if (numValue > 60) {
        badge = "brightgreen";
        value = "high"; // brightgreen para valores >= 60 y < 80
    } else if (numValue > 40) {
        badge = "blue";
        value = "neut"; // "moderada" para valores >= 40 y < 60
    } else if (numValue >= 20) {
        badge = "yellow";
        value = "low"; // "baja" para valores >= 20 y < 40
    } else {
        badge = "red";
        value = "min"; // "minima" para valores < 20
    }
    return { badge, value };
}
export function getGithubUsoByRange(numValue:number):BadgeAndValue{
    let badge: string;
    let value: string;
    switch (true) {
        case numValue === 0:
            badge = "%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98";
            value = "Ninguno";
            break;
        case numValue > 0 && numValue <= 0.05:
            badge = "%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98";
            value = "Ínfimo";
            break;
        case numValue > 0.05 && numValue <= 0.2:
            badge = "%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98";
            value = "Minúsculo";
            break;
        case numValue > 0.2 && numValue <= 0.5:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98";
            value = "Bajo";
            break;
        case numValue > 0.5 && numValue <= 1.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98";
            value = "Reducido";
            break;
        case numValue > 1.0 && numValue <= 1.5:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98";
            value = "Menor";
            break;
        case numValue > 1.5 && numValue <= 2.5:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98";
            value = "Moderado";
            break;
        case numValue > 2.5 && numValue <= 4.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98";
            value = "Notable";
            break;
        case numValue > 4.0 && numValue <= 6.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98";
            value = "Alto";
            break;
        case numValue > 6.0 && numValue <= 9.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1";
            value = "Elevado";
            break;
        case numValue > 9.0 && numValue <= 14.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1";
            value = "Superior";
            break;
        case numValue > 14.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1";
            value = "Dominante";
            break;
        default:
            badge = "";
            value = "";
            break;
    }

    return { badge, value };
}
export const flattenTechs = (proyectos: Leng[]): FullTechData[] => {
    const flattenedArray: FullTechData[] = [];

    proyectos.forEach((proyecto) => {
        // Proyecto principal
        flattenedArray.push({
            nameId: proyecto.nameId,
            nameBadge: proyecto.nameBadge,
            afinidad: proyecto.afinidad,
            valueAfin: getColorByRange(proyecto.afinidad).value,
            experiencia: proyecto.experiencia,
            valueExp: getColorByRange(proyecto.experiencia).value,
            color: proyecto.color,
            isFw: undefined,
            isLib: undefined,
            preferencia: proyecto.preferencia,
            img: proyecto.img,
            web: proyecto.web,
            desc: proyecto.desc,
            usoGithub: proyecto.usoGithub,
            valueUso: getGithubUsoByRange(proyecto.usoGithub).value
        });

        // Frameworks
        proyecto.frameworks?.forEach((framework) => {
            flattenedArray.push({
                nameId: framework.nameId,
                nameBadge: framework.nameBadge,
                afinidad: framework.afinidad,
                valueAfin: getColorByRange(framework.afinidad).value,
                experiencia: framework.experiencia,
                valueExp: getColorByRange(framework.experiencia).value,
                color: framework.color,
                isFw: proyecto.nameId,
                isLib: undefined,
                preferencia: framework.preferencia,
                img: framework.img,
                web: framework.web,
                desc: framework.desc,
                usoGithub: framework.usoGithub,
                valueUso: getGithubUsoByRange(framework.usoGithub).value
            });

            // Librerías
            framework.librerias?.forEach((libreria) => {
                flattenedArray.push({
                    nameId: libreria.nameId,
                    nameBadge: libreria.nameBadge,
                    afinidad: libreria.afinidad,
                    valueAfin: getColorByRange(libreria.afinidad).value,
                    experiencia: libreria.experiencia,
                    valueExp: getColorByRange(libreria.experiencia).value,
                    color: libreria.color,
                    isFw: proyecto.nameId,
                    isLib: framework.nameId,
                    preferencia: libreria.preferencia,
                    img: libreria.img,
                    web: libreria.web,
                    desc: libreria.desc,
                    usoGithub: libreria.usoGithub,
                    valueUso: getGithubUsoByRange(libreria.usoGithub).value
                });
            });
        });
    });

    return flattenedArray;
};