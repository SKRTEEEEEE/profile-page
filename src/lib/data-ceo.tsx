import { BookText, CodeSquare,  HomeIcon, UserRound, Linkedin, Github, Mail, Link, Info } from "lucide-react";
import { SiChakraui, SiNextui, SiSolidity, SiStyledcomponents, SiSwiper, SiTailwindcss  } from "react-icons/si";
import { TbBrandNextjs, TbBrandThreejs } from "react-icons/tb";
import { SiThirdweb } from "react-icons/si";




export const socialNetworks = [
    {
        id: 1,
        logo: <Github  size={30} strokeWidth={1} aria-describedby="Github"/>,
        src: "https://github.com/SKRTEEEEEE",
        title: "Github",
        desc: "Mi perfil en Github"
    },
    // {
    //     id: 2,
    //     logo: <Linkedin size={30} strokeWidth={1} />,
    //     src: "https://github.com/SKRTEEEEEE",
    // },
    {
        id: 3,
        logo: <Mail size={30} strokeWidth={1} aria-describedby="Mail"/>,
        src: "mailto:adanreh.m@gmail.com",
        title: "Mail",
        desc: "Contacto de correo electrónico"
    },

];

export const itemsNavbar = [
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon size={25} color="#fff" strokeWidth={1} aria-describedby="Home"/>,
        link: "/",
        desc: "Volver al inicio"
    },
    {
        id: 2,
        title: "Perfil",
        icon: <UserRound size={25} color="#fff" strokeWidth={1} aria-describedby="Perfil"/>,
        link: "/ceo",
        desc: "Presentación perfil"
    },
    {
        id: 3,
        title: "Información",
        icon: <Info  size={25} color="#fff" strokeWidth={1} aria-describedby="Información"/>,
        link: "/ceo/info",
        desc: "Principal Información tecnológica"
        
    },
    {
        id: 4,
        title: "Portafolio",
        icon: <CodeSquare size={25} color="#fff" strokeWidth={1} aria-describedby="Portafolio"/>,
        link: "/ceo/portafolio",
        desc: "Principales proyectos de código abierto"
        
    },
    {
        id: 5,
        title: "Estudios",
        icon: <BookText  size={25} color="#fff" strokeWidth={1} aria-describedby="Estudios"/>,
        link: "/ceo/estudios",
        desc: "Estudios certificados oficiales"
    },
    {
        id: 6,
        title: "Code",
        icon: <Link  size={25} color="#fff" strokeWidth={1} aria-describedby="Code"/>,
        link: "/ceo/code",
        desc: "Información sobre proyectos de código abierto web3"
    },
];
// De aquí, para abajo, se ha de recoger/guardar en la bdd
export const dataStudiesPage = [
    {
        id: 1,
        title: "Curso Fullstack Javascript",
        institution: "CIEF",
        date: "Actualidad",
        description: 
            "Curso centrado en aprender a crear sitios web interactivos usando HTML, CSS y JavaScript en el lado del cliente, y Node.js en el servidor con MySQL para almacenar datos.",
        badges: [
            "JavaScript", "HTML", "CSS", "Node.js", "Express.js", "MySQL", "BDD", "OOP", "DOM"
        ],
        link: "https://www.grupcief.com/"
    },
    {
        id: 2,
        title: "Chainlink bootcamp 2024",
        institution: "Chainlink",
        date: "20/01/24",
        description: "Entrenamiento oficial para dominar el uso de la tecnología de Oracle Chainlink, abarcando conceptos de blockchain, Solidity, tokens ERC20, NFTs y automatización de Chainlink.",
        badges: [
            "Chainlink", "Blockchain", "Solidity", "ERC721", "ERC20", "Blockchain Oracles", "CCIP", "Chainlink Functions"
        ],
        link: "https://coinmarketcap.com/currencies/chainlink/"
    },
    {
        id: 3,
        title: "Big Data I",
        institution: "Coliseum",
        date: "19/12/23",
        description: "Curso introductorio sobre el uso de Python para manipular grandes conjuntos de datos, incluyendo estadísticas, procesamiento y visualización de datos.",
        badges: [
            "Python"
        ],
        link: "https://www.centrocoliseum.com/"
    },
];

export const dataCounter = [
    {
        id: 0,
        endCounter: 1,
        text: "Año de experiencia",
        lineRight: true,
        lineRightMobile: true,
    },
    {
        id: 1,
        endCounter: 80,
        text: "Funcionalidades desarrolladas",
        lineRight: true,
        lineRightMobile: false,
    },
    {
        id: 2,
        endCounter: 20,
        text: "Proyectos en github",
        lineRight: true,
        lineRightMobile: true,
    },
    // {
    //     id: 3,
    //     endCounter: 30,
    //     text: "Premios ganadores",
    //     lineRight: false,
    //     lineRightMobile: false,
    // },
];

// READY FOR DELETE ⬇️🚫


export const dataPortfolio = [

    {
        id: 2,
        title: "Perfil Web del Desarrollador",
        description: "Mi pagina de perfil como desarrollador",
        objetivo: "Mostrar mis habilidades como desarrollador Fullstack",
        objetivos:[ "SCRUM", "buena documentación", "autorrealización", "compatibilidad frontend"],
        technologies: {
            frontend: [{
                title: "NextJS",
                icon: <TbBrandNextjs size={40}/>,
                version: "v14",
                desc: "parte principal"
            },
            {
                title: "TailwindCSS",
                icon: <SiTailwindcss size={40}/>,
                version: "v3",
                desc: "parte visual principal"
            },
            {
                title: "SwiperJs y TsParticles",
                icon: <SiSwiper size={40}/>,
                version: "",
                desc: "parte visual interactiva"
            }
            ],
            backend:[{
                title: "NextJS",
                icon: <TbBrandNextjs size={40}/>,
                version: "v14",
                desc: "parte principal"
            },
            ]
            
        },
        image: "/ceo/image-3.png",
        urlGithub: "https://github.com/SKRTEEEEEE/profile-page",
        urlDemo: "",
        operative: true,
        ejemplo: true,
    },
    {
        id: 3,
        title: "Blockchain para empresas",
        description: "Pagina de presentación blockchain para empresas",
        objetivo: "Mostrar las posibilidades que ofrece la blockchain para empresas",
        objetivos:[ "conceptos teóricos", "frontend y visual", "auto-realización", "atraer inversiones"],
        technologies: {
            frontend: [{
                title: "NextJS",
                icon: <TbBrandNextjs size={40}/>,
                version: "v14",
                desc: "parte principal"
            },
            {
                title: "TailwindCSS",
                icon: <SiTailwindcss size={40}/>,
                version: "v3",
                desc: "parte visual principal"
            },
            {
                title: "SwiperJs y TsParticles",
                icon: <SiSwiper size={40}/>,
                version: "",
                desc: "parte visual interactiva"
            }
            ]
            
        },
        image: "/ceo/image-2.png",
        urlGithub: "https://github.com/SKRTEEEEEE/blockchain-presentation",
        urlDemo: "https://blockchain-presentation-eta.vercel.app/",
        operative: true,
        ejemplo: true,
    },
 
    {
        id: 4,
        title: "Ejemplos Aplicaciones Descentralizadas",
        description: "Ejemplos de aplicaciones descentralizadas que se pueden personalizar posteriormente",
        objetivo: "Mostrar mis habilidades como desarrollador Fullstack blockchain",
        objetivos:[ "Smart-Contracts", "integración web3/web", "compatibilidad frontend", "uso blockchain"],
        technologies: {
            frontend: [{
                title: "NextJS",
                icon: <TbBrandNextjs size={40}/>,
                version: "v14",
                desc: "parte principal"
            },
            {
                title: "TailwindCSS",
                icon: <SiTailwindcss size={40}/>,
                version: "v3",
                desc: "parte visual principal"
            },
            {
                title: "Styled Compoenents",
                icon: <SiStyledcomponents size={40} />,
                version: "",
                desc: "parte visual principal"
            },
            {
                title: "ChakraUI",
                icon: <SiChakraui size={40}/>,
                version: "",
                desc: "parte visual interactiva"
            },
            {
                title: "ThreeJS",
                icon: <TbBrandThreejs  size={40}/>,
                version: "",
                desc: "parte visual interactiva"
            },
            ],
            backend:[{
                title: "NextJS",
                icon: <TbBrandNextjs size={40}/>,
                version: "v14",
                desc: "parte principal"
            },
            {
                title: "Thirdweb SDK",
                icon: <SiThirdweb size={40} />,
                version: "v4",
                desc: "conectividad web/blockchain"
            },
            {
                title: "Thirdweb CLI",
                icon: <SiThirdweb  size={40}/>,
                version: "",
                desc: "despliegue Smart Contracts"
            },
            {
                title: "Solidity",
                icon: <SiSolidity size={40} />,
                version: "",
                desc: "creación Smart Contracts"
            },
            ]
            
        },
        image: "/ceo/image-4.png",
        urlGithub: "https://github.com/SKRTEEEEEE/ejemplos-dApps",
        urlDemo: "http://ejemplos-d-apps.vercel.app/",
        operative: true,
        ejemplo: true,
    },
    {
        id: 5,
        title: "Web Perfil v2",
        description: "Pagina de perfil como desarrollador mejorada",
        objetivo: "Mejorar la parte del Backend para automatizar procesos",
        objetivos:[ "SCRUM", "proyecto 'propio 100%'", "compatibilidad tecnologías", "añadir backend"],
        technologies: {
            frontend: [{
                title: "NextJS",
                icon: <TbBrandNextjs size={40} />,
                version: "v14",
                desc: "parte principal"
            },
            {
                title: "TailwindCSS",
                icon: <SiTailwindcss size={40}/>,
                version: "v3",
                desc: "parte visual principal"
            },
            {
                title: "SwiperJs y TsParticles",
                icon: <SiSwiper size={40}/>,
                version: "",
                desc: "parte visual interactiva"
            }
            ],
            backend:[{
                title: "NextJS",
                icon: <TbBrandNextjs size={40}/>,
                version: "v14",
                desc: "parte principal"
            },
            ]
            
        },
        image: "/ceo/image-3.jpg",
        urlGithub: "https://github.com/SKRTEEEEEE/profile-page/tree/v01.02/",
        urlDemo: "",
        operative: false,
        ejemplo: true,
    },
];

export const admins = [
    "0x490bb233c707A0841cA52979Be4D88B6621d1988",
    "0x246264E2741C1bdDA990e9d48fF63DAa6fF242A3",
    "0xd65EC541B9EC79859A9a34F0665B824d46b62F6f"
]
