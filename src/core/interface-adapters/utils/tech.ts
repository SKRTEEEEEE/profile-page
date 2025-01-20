// ⚠️ HAY QUE TERMINAR ❗ - 11.01.2025



import {  FullTechData, Leng } from "@/core/domain/entities/tech";
import { getTranslations } from "next-intl/server";
import { PreTechBase } from "@/core/domain/entities/pre-tech";
import { updateGithubFileContentUC } from "@/actions/octokit";






const owner = "SKRTEEEEEE";
const repo = "markdowns";

//Trabajaremos con la rama main(AL FINAL) para no tener que estar haciendo "git pulls al main"
const ref = "profile-page";
const baseOptions = {
    owner:"SKRTEEEEEE",
    repo: "markdowns",
    ref: "profile-page"
}
const path = { md: "sys/techs-test.md", json: "sys/techs-test.json" };



//CREACION TECH


type TechJsonData = {
    name: string;
    afinidad: number;
    value: string;
    experiencia: number;
    valueexp: string;
    usogithub: number;
    valueuso: string;
};
// export async function actualizarJson(proyectosDB: Leng[]) {
//     "use server"
//     const t = await getTranslations("ceo.info.section.slider")
//     const jsonSha = await fetchFileSha(path.json);
//     if (!jsonSha) {
//         console.error("El archivo .json no se encuentra en el repositorio");
//         return;
//     }
//     const newJsonData: { [key: string]: TechJsonData } = {};

//     for (const proyecto of flattenTechs(proyectosDB)) {
//         const lenguajeName = proyecto.nameBadge;
        
//         const githubPercentage = await getGithubPercentage(proyecto.nameId);

//         const languageData: TechJsonData = {
//             name: proyecto.nameId,
//             afinidad: proyecto.afinidad,
//             value: t(`values.${proyecto.valueAfin}`),
//             experiencia: proyecto.experiencia,
//             valueexp: t(`values.${(proyecto.valueExp)}`),
//             usogithub: githubPercentage,
//             valueuso: proyecto.valueUso
//         };

//         newJsonData[lenguajeName] = languageData;
//     }

//     return newJsonData;
// }
//AQUI EMPIEZA
export async function actualizarJson(proyectosDB: Leng[]) {
    "use server"
    const t = await getTranslations("ceo.info.section.slider")
    // const jsonSha = await fetchFileSha(path.json);
    // if (!jsonSha) {
    //     console.error("El archivo .json no se encuentra en el repositorio");
    //     return;
    // }

    const newJsonData = flattenTechs(proyectosDB).reduce<{ [key: string]: TechJsonData }>( (acc, proyecto) => {
        const lenguajeName = proyecto.nameBadge; // Nombre del lenguaje como clave

        // Crear el objeto con los datos correspondientes
        const languageData: TechJsonData = {
            name: proyecto.nameId,
            afinidad: proyecto.afinidad,
            value: t(`values.${proyecto.valueAfin}`),
            // value: proyecto.value,  
            experiencia: proyecto.experiencia,
            valueexp: t(`values.${(proyecto.valueExp)}`),
            // valueexp: proyecto.valueexp,  
            // usogithub: await getGithubPercentage(proyecto.nameId),
            usogithub: proyecto.usoGithub,
            valueuso: proyecto.valueUso
        };

        // Asigna el objeto al acumulador utilizando el nombre del lenguaje como clave
        acc[lenguajeName] = languageData;

        return acc;
    }, {});


    await updateGithubFileContentUC(path.json, baseOptions,{message:"Actualizar archivo .json",content: JSON.stringify(newJsonData, null, 2)});
    console.log("Archivo Json actualizado");
}

// ⚠️ HAY QUE TERMINAR ❗ - 11.01.2025

export async function actualizarMd(proyectosDB: Leng[]|null, create?:PreTechBase) {
    "use server"
    // const color = create?.colorhash.slice(1)

    try {
        // const mdSha = await fetchFileSha(path.md);
        // if (!mdSha) {
        //     throw new Error("El archivo .md no se encuentra en el repositorio");
        // }
        let newMdContent = `# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
<p align="center">
<a href="#">
    <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
</a>
</p>\n\n\n***\n\n\n`;
        if(create){
            console.log("create: ", create)
            newMdContent += createBadgeTech(create, true)
        }
        

        proyectosDB?.sort((a, b) => a.preferencia - b.preferencia).forEach((proyecto) => {
            newMdContent += `\n\n>- ## ${createBadgeTech(proyecto)}`;
            if (proyecto.frameworks) {
                proyecto.frameworks.sort((a, b) => a.preferencia - b.preferencia);
                proyecto.frameworks.forEach((framework) => {
                    newMdContent += `\n\n> ### ${createBadgeTech(framework)}`;
                    if (framework.librerias) {
                        framework.librerias.sort((a, b) => a.preferencia - b.preferencia).forEach((libreria) => {
                            newMdContent += `\n> - #### ${createBadgeTech(libreria)}`;
                        });
                    }
                });
            }
        });

        await updateGithubFileContentUC(path.md, baseOptions,{message:"Actualizar archivo .md", content:newMdContent});
        console.log("Archivo Markdown actualizado");
    } catch (error) {
        console.error("Error actualizando el archivo .md:", error);
    }
}

export function createBaseBadge(data: PreTechBase){
    const {nameId, web} = data
    // const color = tech.color.slice(1)
    const baseLink = getTechsLinks(data).base
    return(
        `[![${nameId}](${baseLink})](${web})`
    )
}
/**
 * Calcula el color de contraste (blanco o negro) para un color hexadecimal dado
 * @param hexColor - Color hexadecimal en formato "#RRGGBB"
 * @returns "#000000" para negro o "#FFFFFF" para blanco
 */
export function getContrastColor(hexColor: string): string {
    // Remover el # si existe
    // const hex = hexColor.replace('#', '');
    
    // Convertir a RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    
    // Calcular la luminancia relativa
    // Fórmula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Si la luminancia es mayor a 0.5, el color es considerado "claro"
    // y necesitamos texto negro. En caso contrario, necesitamos texto blanco.
    return luminance > 0.5 ? "black" : "white";
}
export function createBadgeTech(tech: PreTechBase, newTech?: true ) {
    const {af, afNum, exp, expNum, github, githubNum} = getTechsLinks({nameId: tech.nameId, color: tech.color, nameBadge:tech.nameBadge, web:tech.web})
    const baseBadge = createBaseBadge({nameId: tech.nameId, color: tech.color, nameBadge:tech.nameBadge, web:tech.web})
    console.log("baseBadge: ", baseBadge)
    if(newTech === true) {
        return(`>- ## ${baseBadge}\n>![Afinidad](${af})![Afinidad %](${afNum})\n![Experiencia](${exp})![Experiencia %](${expNum})\n![Uso En Github](${github})![Uso en Github %](${githubNum})\n>\n>![New Badge](https://img.shields.io/badge/%C2%A1_novedad_%F0%9F%91%8D_!-NEW_%F0%9F%93%A5_%F0%9F%97%92%EF%B8%8F-blue?style=social)`)
    }else {
        return(`${baseBadge}\n>![Afinidad](${af})![Afinidad %](${afNum})\n![Experiencia](${exp})![Experiencia %](${expNum})\n![Uso En Github](${github})![Uso en Github %](${githubNum})`)
    }
}
type GetLinksResp = {
    base: string
    af: string
    afNum: string
    exp: string
    expNum: string
    github: string
    githubNum: string
}
function getTechsLinks({nameId, nameBadge, color}: PreTechBase): GetLinksResp {
    const logoColor = getContrastColor(color)
    return {
        base: `https://img.shields.io/badge/-${nameId.replace(/\s+/g, '')}-${color}?style=for-the-badge&logo=${nameBadge}&logoColor=${logoColor}`,
        af: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.value&label=%F0%9F%92%97%20Afinidad&color=${color}&style=flat&logo=${nameBadge}`,
        afNum: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.afinidad&color=${color}&style=flat&label=%20&suffix=%25`,
        exp: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.valueexp&label=%F0%9F%8F%85%20Experiencia&color=${color}&style=flat&logo=${nameBadge}`,
        expNum: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.experiencia&color=${color}&style=flat&label=%20&suffix=%25`,
        github: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${color}&style=flat&logo=${nameBadge}`,
        githubNum: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.usogithub&color=${color}&style=flat&label=%20&suffix=%25`

    }
}


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


//¿?¿ -> Siempre que se llama a flattenTechs se utiliza readAllTechUC antes, deberiamos crear un caso de uso, y antes comprobar porque no estamos utilizando docToPrimary
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