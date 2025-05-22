import { updateGithubFileContentUC } from "@/actions/octokit"
import { FullTechData } from "@/core/domain/entities/tech"
import { MongooseBase } from "@/core/infrastructure/mongoose/types"
import { readAllTechsCMongoose } from "./read.controller"
import { getTranslations } from "next-intl/server"
import { Leng } from "../../types/app.entitie"
// ⚠️ Hay que arreglar esto ⬇️⬇️
const baseOptions = {
    owner:"SKRTEEEEEE",
    repo: "markdowns",
    ref: "main"
    // ref: "profile-page"
}
const path = { md: "about/techs.md", json: "sys/techs.json" };

const techsHeaderBanner = `<img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,obsidian,md,html,css,styledcomponents,tailwind,threejs,react,js,ts,prisma,sqlite,mongodb,mysql,nextjs,nodejs,express,py,php,c,cpp,sentry,redux,firebase,vercel,bash,powershell,npm,vscode,notion,ableton,windows&perline=18" />`

export enum ActualizarGithubTechsType {"md", "json", "all"}
type ActualizarGithubTechsProps = {
    
    type: ActualizarGithubTechsType
    create?: {
        base:PreTechBase
        oldTechs: Leng[]
    }
    
}
export async function actualizarGithubTechsCMongoose(props:ActualizarGithubTechsProps){
    const {flattenTechs, techs} = await readAllTechsCMongoose()
    if(props.create!==undefined){
        try {
            await actualizarMd({create: props.create})
            await actualizarJson(flattenTechs)
        } catch (error) {
            console.error("Error at actualizarGithubTechs, create variant")
        }
    } else {
        try {
            if(props.type === ActualizarGithubTechsType.all){
                await actualizarMd({proyectosDB:techs})
                await actualizarJson(flattenTechs)
            } 
            if(props.type === ActualizarGithubTechsType.json){
                await actualizarJson(flattenTechs)
            }
        } catch (error) {
            console.error("Error at actualizarGithubTechs, not-create variant")
        }
    }
}
async function actualizarMd(props:{create?: ActualizarGithubTechsProps["create"], proyectosDB?: (Leng & MongooseBase)[]}){
    const{create, proyectosDB} = props 
    try {
            let proyectos
            if(create === undefined){
                proyectos = proyectosDB
            } else {
                proyectos = create.oldTechs
            }
            
            // // Si hay un nuevo proyecto, filtrar proyectosDB para eliminar coincidencias
            // if (!create) {
            //     proyectosFiltrados = proyectosDB.filter(proyecto => 
            //         proyecto.nameId.toLowerCase() !== create.nameId.toLowerCase()
            //     );
            // }
let newMdContent = `# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
<p align="center">
<a href="#">
${techsHeaderBanner}
</a>
</p>\n\n\n***\n\n\n`;
            if(create){
                console.log("create: ", create)
                newMdContent += createBadgeTech(create.base, true)
            }
            
    
            proyectos?.sort((a, b) => a.preferencia - b.preferencia).forEach((proyecto) => {
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
type TechJsonData = {
    name: string;
    afinidad: number;
    value: string;
    experiencia: number;
    valueexp: string;
    usogithub: number;
    valueuso: string;
};
async function actualizarJson(flattenTechs: FullTechData[]) {
    // -> utiliza flattenTechs
    const t = await getTranslations("ceo.info.section.slider")
    // const jsonSha = await fetchFileSha(path.json);
    // if (!jsonSha) {
    //     console.error("El archivo .json no se encuentra en el repositorio");
    //     return;
    // }

    const newJsonData = flattenTechs.reduce<{ [key: string]: TechJsonData }>( (acc, proyecto) => {
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

function createBaseBadge(data: PreTechBase){
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
function getContrastColor(hexColor: string): string {
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
function createBadgeTech(tech: PreTechBase, newTech?: true ) {
    const {af, afNum, exp, expNum, github, githubNum} = getTechsLinks({nameId: tech.nameId, color: tech.color, nameBadge:tech.nameBadge, web:tech.web})
    const baseBadge = createBaseBadge({nameId: tech.nameId, color: tech.color, nameBadge:tech.nameBadge, web:tech.web})
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
    const{ repo, ref, owner} = baseOptions
    const logoColor = getContrastColor(color)
    return {
        base: `https://img.shields.io/badge/-${nameId = nameId.replace(/[\s-]+/g, '%20')}-${color}?style=for-the-badge&logo=${nameBadge}&logoColor=${logoColor}`,
        af: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.value&label=%F0%9F%92%97%20Afinidad&color=${color}&style=flat&logo=${nameBadge}`,
        afNum: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.afinidad&color=${color}&style=flat&label=%20&suffix=%25`,
        exp: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.valueexp&label=%F0%9F%8F%85%20Experiencia&color=${color}&style=flat&logo=${nameBadge}`,
        expNum: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.experiencia&color=${color}&style=flat&label=%20&suffix=%25`,
        github: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${color}&style=flat&logo=${nameBadge}`,
        githubNum: `https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.json}&query=$.${nameBadge}.usogithub&color=${color}&style=flat&label=%20&suffix=%25`

    }
}
