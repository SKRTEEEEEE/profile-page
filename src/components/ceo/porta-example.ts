import { KeyCardProjectProps } from "./feature-card"
import { PortafolioLinksProps } from "./porta-links"
import { DataTimeLine } from "./time-line"

type PortafolioExample = {
    title: string
    img: string
    imgDesc: string
    desc: string
    links: PortafolioLinksProps["data"]
    techs: string[]
    keys: KeyCardProjectProps[]
    time: DataTimeLine[]
}

export const portafolioExample = [
    {
        title: "Página de perfil",
        links: {
            github: "https://github.com/SKRTEEEEEE/profile-page",
        },
        // parte descripción
        img: "/ceo/image-2.png",
        imgDesc: "Imagen muy bonita de mi web",
        desc: "Proyecto de web personal en la que explorar mis posibilidades como programador",
        // parte detalles
        techs: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Node.js', 'MongoDB'],
        keys: [
            {
                icon:{
                    iconName: "Cpu",
                    className: "w-6 h-6",
                },
                title: "Rendimiento Optimizado",
                desc: "Arquitectura de alto rendimiento con optimizaciones avanzadas para una experiencia fluida."
            },
            {
                icon:{
                    iconName: "Shield",
                    className: "w-6 h-6",
                },
                title: "Seguridad Avanzada",
                desc: "Implementación de protocolos de seguridad de última generación para proteger datos sensibles."
            },
            {
                icon:{
                    iconName: "Zap",
                    className: "w-6 h-6",
                },
                title: "Tiempo Real",
                desc: "Actualizaciones instantáneas y sincronización en tiempo real entre todos los usuarios."
            },
            {
                icon:{
                    iconName: "Workflow",
                    className: "w-6 h-6",
                },
                title: "Flujo de Trabajo",
                desc: "Procesos automatizados y flujos de trabajo personalizables para máxima eficiencia."
            },
        ],
        // parte time-line
        time: [
            {
                id: "jsdkajksdjkla",
                title: "v2",
                desc: "Integrar una mejor UI y UX en la sección de 'sobre mi' y 'admin', incluyendo multi lenguaje (de Catalán, Ingles, Alemán y Español) 🚀",
                subtitle: "Fullstack",
                date: "Actualidad",
                badges: ["React", "uploadthing", "mongoose", "i18n", "Framer motion","Perplexity UI", ]                
            },
            {
                id: "jkdasjkakjla",
                title: "v1",
                desc: "Traspasar la web/backend a clean arquitectura (hexagonal) 🚀",
                subtitle: "Fullstack",
                date: "Nov 19, 2024",
                badges: ["TypeScript", "NextJS", "MongoDB", "JavaScript", "Third web","Perplexity UI", ]                   
            },
            {
                id: "kajdakljdasklajkdla",
                title: "v0",
                desc: "Crear app principal de 'sobre mi' y 'academia', con SAAS incluido en la parte de 'academia' y auto update de la información en Github🎉",
                subtitle: "Fullstack",
                date: "Nov 15, 2024",
                badges: ["TailwindCSS","next-mdx-remote", "shadcn/ui", "swiper", "ts-particles",  "strapi"]                
            },
        ]
    }
]