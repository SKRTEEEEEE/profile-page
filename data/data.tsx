import { BookText, CodeSquare,  HomeIcon, UserRound, Linkedin, Github, Mail, Link } from "lucide-react";
import { FaNodeJs, FaReact } from "react-icons/fa";
// import { RiNextjsLine } from "react-icons/ri";

import { SiChakraui, SiNextui, SiSolidity, SiStyledcomponents, SiSwiper, SiTailwindcss  } from "react-icons/si";
import { TbBrandNextjs, TbBrandThreejs, TbBrandTypescript } from "react-icons/tb";
import { SiThirdweb } from "react-icons/si";
import { RiJavascriptLine } from "react-icons/ri";


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
        title: "AboutMe",
        icon: <UserRound size={25} color="#fff" strokeWidth={1} aria-describedby="AboutMe"/>,
        link: "/about-me",
        desc: "Información tecnológica sobre mi"
    },
    {
        id: 3,
        title: "Portfolio",
        icon: <CodeSquare size={25} color="#fff" strokeWidth={1} aria-describedby="Portfolio"/>,
        link: "/portfolio",
        desc: "Principales proyectos de código abierto"
        
    },
    {
        id: 4,
        title: "Services",
        icon: <BookText  size={25} color="#fff" strokeWidth={1} aria-describedby="Services"/>,
        link: "/services",
        desc: "Estudios certificados oficiales"
    },
    {
        id: 5,
        title: "Code",
        icon: <Link  size={25} color="#fff" strokeWidth={1} aria-describedby="Code"/>,
        link: "/code",
        desc: "Información sobre proyectos de código abierto web3"
    },
];

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

export const lenguajesResources = [
    {
        icon: <FaReact aria-description="React icono"/>,
        title: "React",
        description: "React-DOM, JWT, Hooks, APIs, Protected Routes, JSX, Router, Redux, etc...",
        img: "https://iili.io/H7ALWtR.jpg"
    },
    {
        icon: <SiTailwindcss aria-description="Tailwind icono"/>,
        title: "TailwindCSS",
        description: "Mobile-first, resposive, utility-first, classes y variables, plugins, etc...",
        img: "https://cdn3d.iconscout.com/3d/free/preview/free-tailwind-9294852-7577995.png?f=webp&h=700"
    },
    {
        icon: <TbBrandNextjs aria-description="Next javascripts icono"/>,
        title: "Next.js",
        description: "SSR, CSR, APIs, Pre-rendering, SEO Friendly, Next.js14 Compability, etc...",
        img: "https://tsh.io/wp-content/uploads/2022/03/Next-logo-adj.png"
    },
    {
        icon: <FaNodeJs aria-description="Node javascript icono"/>,
        title: "Node.js",
        description: "Async/Await, Nodemon.js, Express.js, NPM (Node Package Manager), JSON, etc...",
        img: "https://cdn3d.iconscout.com/3d/free/thumb/free-nodejs-11492982-9325317.png"
    },
    {
        icon: <SiSolidity aria-description="Solidity icono"/>,
        title: "Solidity",
        description: "Smart Contracts, Hardhat, Ethet.js, Thirdweb, Estandares ERC, Chainlink, etc... ",
    },
    {
        icon: <RiJavascriptLine aria-describedby="Javascript icono"/>,
        title: "Javascript",
        description: "DOM, Eventos, Objetos, Arrays, Funciones, etc...",
        img: "https://static.vecteezy.com/system/resources/previews/012/697/298/non_2x/3d-javascript-logo-design-free-png.png",
    },
    {
        icon: <TbBrandTypescript aria-describedby="Typescript icono"/>,
        title: "Typescript",
        description: "Tipado de classes, funciones, promesas, hooks, etc...",
        img: "https://cdn3d.iconscout.com/3d/free/thumb/free-typescript-11492969-9325304.png?f=webp",
    },
    {
        icon: <SiNextui  aria-describedby="NextUI icono"/>,
        title: "NextUI",
        description: "Diseño UI, componentes accesibles, personalizables, interfaces de usuario modernas, interfaces elegantes.",
        img: "https://avatars.githubusercontent.com/u/86160567?v=4",
    },

];

export const dataPortfolio = [

    // {
    //     id: 1,
    //     title: "Presentación responsiva",
    //     image: "/image-1.png",
    //     urlGithub: "https://github.com/SKRTEEEEEE",
    //     urlDemo: "https://tokenizacion.my.canva.site/ventajas-tecnologicas-3",
    //     operative: true,
    // },
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
        image: "/image-3.png",
        urlGithub: "https://github.com/SKRTEEEEEE/profile-test",
        urlDemo: "#",
        operative: true,
        ejemplo: true,
    },
    {
        id: 3,
        title: "Blockchain para empresas",
        description: "Pagina de presentación blockchain para empresas",
        objetivo: "Mostrar las posibilidades que ofrece la blockchain para empresas",
        objetivos:[ "conceptos teóricos", "frontend y visual", "autorrealización", "atraer inversiones"],
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
        image: "/image-2.png",
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
        image: "/image-4.png",
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
        image: "/image-3.jpg",
        urlGithub: "https://github.com/SKRTEEEEEE/profile-test",
        urlDemo: "#!",
        operative: false,
        ejemplo: true,
    },
    // {
    //     id: 6,
    //     title: "Web Dinámica",
    // description: "Mi pagina de perfil como desarrollador",
    // objetivo: "Mostrar mis habilidades como desarrollador Fullstack",
    //     objetivos:[ "SCRUM", "buena documentación", "proyecto 'propio 100%'", "compatibilidad tecnologías"],
    //     technologies: {
    //         frontend: [{
    //             title: "NextJS",
    //             icon: <TbBrandNextjs />,
    //             version: "v14",
    //             desc: "parte principal"
    //         },
    //         {
    //             title: "TailwindCSS",
    //             icon: <SiTailwindcss />,
    //             version: "v3",
    //             desc: "parte visual principal"
    //         },
    //         {
    //             title: "SwiperJs y TsParticles",
    //             icon: <SiSwiper />,
    //             version: "",
    //             desc: "parte visual interactiva"
    //         }
    //         ],
    //         backend:[{
    //             title: "NextJS",
    //             icon: <TbBrandNextjs />,
    //             version: "v14",
    //             desc: "parte principal"
    //         },
    //         ]
            
    //     },
    //     image: "/image-6.jpg",
    //     urlGithub: "#!",
    //     urlDemo: "#!",
    //     operative: false,
    // },
    // {
    //     id: 7,
    //     title: "Dark Web ",
    //     image: "/image-7.jpg",
    //     urlGithub: "#!",
    //     urlDemo: "#!",
    //     operative: false,
    // },
    // {
    //     id: 8,
    //     title: "E-commerce web",
    //     image: "/image-8.jpg",
    //     urlGithub: "#!",
    //     urlDemo: "#!",
    //     operative: false,
    // }
];
