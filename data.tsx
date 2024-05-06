import { BookText, CodeSquare,  HomeIcon, UserRound, Linkedin, Github, Mail, Link } from "lucide-react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiSolidity, SiTailwindcss } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

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
        title: "Web Perfil del Desarrollador",
        image: "/image-3.png",
        urlGithub: "https://github.com/SKRTEEEEEE/profile-test",
        urlDemo: "#!",
        operative: true,
    },
    {
        id: 3,
        title: "Web Presentación Blockchain",
        image: "/image-2.png",
        urlGithub: "https://github.com/SKRTEEEEEE/blockchain-presentation",
        urlDemo: "https://blockchain-presentation-eta.vercel.app/",
        operative: true,
    },
 
    {
        id: 4,
        title: "Ejemplos Aplicaciones Descentralizadas",
        image: "/image-4.png",
        urlGithub: "https://github.com/SKRTEEEEEE/ejemplos-dApps",
        urlDemo: "http://ejemplos-d-apps.vercel.app/",
        operative: true,
    },
    {
        id: 5,
        title: "Web Perfil v2",
        image: "/image-5.jpg",
        urlGithub: "https://github.com/SKRTEEEEEE/frontpruebas",
        urlDemo: "#",
        operative: false,
    },
    // {
    //     id: 6,
    //     title: "Web Dinámica",
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