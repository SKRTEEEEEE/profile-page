"use client"
import { JSX, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TbBrandNextjs } from 'react-icons/tb';
import { SiChakraui, SiSolidity, SiStyledcomponents, SiSwiper, SiTailwindcss, SiThirdweb } from 'react-icons/si';
import Link from 'next/link';
// import { Link } from '@/i18n/routing';
const getIcon = (techName: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "TbBrandNextjs": <TbBrandNextjs size={40} />,
    "SiTailwindcss": <SiTailwindcss size={40} />,
    "SiSwiper": <SiSwiper size={40} />,
    "SiStyledcomponents": <SiStyledcomponents size={40} />,
    "SiChakraui": <SiChakraui size={40} />,
    "SiThirdweb": <SiThirdweb size={40} />,
    "SiSolidity": <SiSolidity size={40} />
  };
  return iconMap[techName] || null;
};


type Tech = {

  title: string;
  iconName: string;
  version: string;
  desc: string;

};
type Techs = {
  frontend?: Tech[],
  backend?: Tech[]

}

type Project = {
  id: number;
  title: string;
  description: string;
  main_objetive: string;
  objetives: string[];
  technologies: Techs;
  image: string;
  urlGithub: string;
  urlDemo?: string; 
  operative: boolean;
  ejemplo: boolean;
};

export default function ProjectsPage() {
  const projectsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations("ceo.proyectos")
  const c = useTranslations("common")

  const projects = t.raw("id");
  
  const mappedProjects = projects.map((project: Project, index: number) => {
    const frontends = project.technologies?.frontend || [];
    const backends = project.technologies?.backend || [];
    return {
      id: index,
      title: project.title || '',
      description: project.description || '',
      objetivo: project.main_objetive || '',
      objetivos: project.objetives || [],
      technologies: {
        frontend: frontends.map((tech: Tech) => ({
          ...tech,
          icon: getIcon(tech.iconName)
        })),
        backend: backends.map((tech: Tech) => ({
          ...tech,
          icon: getIcon(tech.iconName)
        }))
      },
      urlDemo: project.urlDemo || '',
      urlGithub: project.urlGithub || '',
      operative: project.operative || false,
      ejemplo: project.ejemplo || false
    };
  });
  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = mappedProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(mappedProjects.length / projectsPerPage);
  console.log("currentProjects: ", currentProjects)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //   console.log(currentPage);


  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="p-4 text-3xl xl:text-4xl font-bold mb-8">{t("main.h1")}</h1>
      <ul className="w-11/12 xl:w-9/12 flex flex-col gap-4">
        {currentProjects.map((data: Project) => (
          <li className="flex justify-between" key={data.id}>
            <h2 className='text-md xl:text-2xl'>{data.title}</h2>
            <div className='flex'>
              {data?.urlDemo && <Link className='mr-4 px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-300/50 hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80 sm:inline hidden' href={data.urlDemo} target='_blank'>{t("main.ul.buttons.url_demo.0")} <span className="hidden xl:inline">{t("main.ul.buttons.url_demo.0")}</span>🧑‍💻</Link>}
              {data?.urlGithub && <Link className='mr-4 px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-300/50 hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80 sm:inline hidden' href={data.urlGithub} target='_blank'><span className="hidden xl:inline">{t("main.ul.buttons.url_github.0")} </span>{t("main.ul.buttons.url_github.1")}📄</Link>}
              <Link className='px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-400/30 hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80' href={`/ceo/proyectos/${data.id}`}>{t("main.ul.buttons.url_project.0")} <span className="hidden lg:inline mr-4">{t("main.ul.buttons.url_project.1")}</span>➡️</Link></div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex gap-4">
        <button
          onClick={goToPrevPage}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-danger/10 text-primary-ceo-100/30 cursor-not-allowed' : 'border-secondary-ceo-200/80 hover:border-secondary-ceo-300 border-2 bg-primary-ceo-500/40 hover:bg-primary-ceo-800/80 text-primary-ceo-100'
            }`}
          disabled={currentPage === 1}
        >
          {c("previous")}
        </button>
        <button
          onClick={goToNextPage}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-danger/10 text-primary-ceo-100/30 cursor-not-allowed' : 'border-secondary-ceo-200/80 hover:border-secondary-ceo-300 border-2 bg-primary-ceo-500/40 hover:bg-primary-ceo-800/80 text-primary-ceo-100'
            }`}
          disabled={currentPage === totalPages}
        >
          {c("next")}
        </button>
      </div>
    </main>
  );
}
