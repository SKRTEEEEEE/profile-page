import { BookText, CodeSquare,  HomeIcon, UserRound, Linkedin, Github, Mail, Link } from "lucide-react";
import { FaNodeJs, FaReact } from "react-icons/fa";
// import { RiNextjsLine } from "react-icons/ri";

import { SiChakraui, SiSolidity, SiStyledcomponents, SiSwiper, SiTailwindcss  } from "react-icons/si";
import { TbBrandNextjs, TbBrandThreejs } from "react-icons/tb";
import { SiThirdweb } from "react-icons/si";


export const socialNetworks = [
    {
        id: 1,
        logo: <Github  size={30} strokeWidth={1} />,
        src: "https://github.com/SKRTEEEEEE",
    },
    // {
    //     id: 2,
    //     logo: <Linkedin size={30} strokeWidth={1} />,
    //     src: "https://github.com/SKRTEEEEEE",
    // },
    {
        id: 3,
        logo: <Mail size={30} strokeWidth={1} />,
        src: "mailto:adanreh.m@gmail.com",
    },

];


export const itemsNavbar = [
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon size={25} color="#fff" strokeWidth={1} />,
        link: "/",
    },
    {
        id: 2,
        title: "User",
        icon: <UserRound size={25} color="#fff" strokeWidth={1} />,
        link: "/about-me",
    },
    {
        id: 3,
        title: "Target",
        icon: <CodeSquare size={25} color="#fff" strokeWidth={1} />,
        link: "/portfolio",
        
    },
    {
        id: 4,
        title: "Book",
        icon: <BookText  size={25} color="#fff" strokeWidth={1} />,
        link: "/services",
    },
    {
        id: 5,
        title: "Code",
        icon: <Link  size={25} color="#fff" strokeWidth={1} />,
        link: "/code",
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

export const serviceData = [
    {
        icon: <FaReact />,
        title: "ReactJS",
        description: "React-DOM, JWT, Hooks, APIs, Protected Routes, JSX, Router, Redux, etc...",
    },
    {
        icon: <SiTailwindcss />,
        title: "TailwindCSS",
        description: "Mobile-first, resposive, utility-first, classes y variables, plugins, etc...",
    },
    {
        icon: <TbBrandNextjs />,
        title: "NextJS",
        description: "SSR, CSR, APIs, Pre-rendering, SEO Friendly, Next.js14 Compability, etc...",
    },
    {
        icon: <FaNodeJs />,
        title: "Node.js",
        description: "Async/Await, Nodemon.js, Express.js, NPM (Node Package Manager), JSON, etc...",
    },
    {
        icon: <SiSolidity />,
        title: "Solidity",
        description: "Smart Contracts, Hardhat, Ethet.js, Thirdweb, Estandares ERC, Chainlink, etc... ",
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
        title: "Perfil del Desarrollador",
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
        urlDemo: "#!",
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

export const web3page = [
    {
        id: 1,
        name: 'Safe Storage',
        path: "/counter",
        contractUrl: "https://github.com/SKRTEEEEEE/trySolidity24/blob/main/markdown/contratos_desplegados.md",
        active: true,
        title: "Almacén",
        description: "Programa de almacenamiento seguro, utilizando una blockchain existente e su inmutabilidad para almacenar datos",
        usos: [
          "Maxima seguridad en el almacenamiento de datos", "Acceso a los datos a traves de tecnología web","Ventajas asociadas a la seguridad blockchain" 
        ],
        instrucciones:[
          "Conectar una billetera", "Introducir un numero a guardar", "Clickar en el boton de guardar", "Aceptar la interacción con el contrato", "Comprobar en la pagina como se ha modificado el numero"
        ]
  
      },
      {
        id: 2,
        name: 'NFT MemberShip',
        path: "/nft-membership",
        contractUrl: "https://github.com/SKRTEEEEEE/trySolidity24/blob/main/markdown/contratos_desplegados.md",
        active: true,
        title: "Membresía",
        description: "Programa de membresía con NFT asociado, utilizando blockchain para gestionar la membresía",
        usos: [
          "Acceso a contenido exclusivo para los poseedores", "Seguridad en el intercambio e uso del NFT", "Ventajas asociadas a los tokens ERC1155"
        ],
        instrucciones:[
          "Conectar una billetera", "Conseguir tokens de prueba SepoliaETH", "Clickar en el boton de comprar el NFT", "Aceptar la compra con la billetera", "Comprobar en Opensea o otras plataformas NFT", "O en la pagina en la pagina donde acabas de comprar el NFT", "Ahora podrás acceder a la pagina de membresía y su contenido exclusivo"
        ]
      },
      {
        id: 3,
        name: 'Lottery',
        path: "/nft-raffle",
        contractUrl: "https://github.com/SKRTEEEEEE/trySolidity24/blob/main/markdown/contratos_desplegados.md",
        active: true,
        title: "Sorteo",
        description: "Programa de sorteo de NFT de membresía, utilizando una blockchain existente y su seguridad para gestionar el sorteo",
        usos: [
          "Acceso a contenido exclusivo para los participantes", "Seguridad en el intercambio e uso del NFT", "Ventajas asociadas a los tokens ERC1155"
        ],
        instrucciones:[
          "Conectar una billetera", "Conseguir tokens de prueba SepoliaETH", "Marcar la cantidad de tokens que se desean", "Aceptar la compra con la billetera", "Comprobar a final de mes si has sido premiado", "Podrás mirarlo en Opensea o otras plataformas NFT", "O en la pagina de la rifa, en la sección de ganadores"
        ]
  
      },
        // {
        //   'Marketing 3.0',},
    
    //   {
    //       id: 4,
    //       name: 'Other',
    //       contractUrl: "/#",
    //       path: "/#",
    //       false: false,
      
    //   },
];