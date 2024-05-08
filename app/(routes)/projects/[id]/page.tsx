import AutoplaySliderTechs from "@/components/main/autoplay-slider-techs";
import { dataPortfolio } from "@/data";
import { TechLenguajeItem } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface TechsSectionProps {
  techs: TechLenguajeItem[],
  sectionTitle: string,
}

const TechsSection: React.FC<TechsSectionProps> = ({ techs, sectionTitle }) => (techs.length > 1) ? (<section className="flex w-dvw flex-col align-center">


    <h3 className="absolute ml-4 xl:ml-24 text-xl text-primary-200 font-semibold">{sectionTitle}</h3>
    <AutoplaySliderTechs data={techs} />
  </section>) :
    <section className="flex w-dvw flex-col align-center">


      <h3 className="absolute ml-4 xl:ml-24 text-xl text-primary-200 font-semibold">{sectionTitle}</h3>
      {techs?.map((tech) => {
        const shouldRenderParagraph = tech?.version && tech?.version.trim() !== '';
        return (<div className="flex justify-center align-center">
          {tech.icon}
          <div className="flex flex-col">
            <span> {tech.title} {shouldRenderParagraph && tech.version} </span>
            <span className="text-xs"><i>{tech.desc}</i></span>
          </div>

        </div>)
      }
      )}
    </section>

export default function ProjectsDynPage({ params }: { params: { id: number } }) {
  const project = dataPortfolio.find((item) => item.id == params.id);


  if (!project) {
    return (
      <main className="min-h-dvh w-dvw flex items-center justify-center">
        <div>No se encontró el proyecto</div>
      </main>
    );
  }
  return (
    <main className="min-h-dvh w-dvw flex flex-col items-start justify-center">

      <h1 className="px-4 xl:pl-24 text-primary-400 text-semibold text-3xl">{project.title}</h1>
      <p className="px-4 xl:pl-24 ">{project.description}</p>

      <section className="mx-4 xl:ml-24 flex gap-4 rounded-2xl bg-secondary-800 my-2 px-2">

        {/* <p>{project.description}</p> */}
        <div className="w-32 h-32 rounded-full xl:mt-6 mt-2 border-4 border-primary-800/40 overflow-hidden hidden sm:inline">
          <Image className="w-full h-full object-cover" width={300} height={100} src={project.image} alt={project.title} /></div>
        <div className="flex flex-col align-center items-center justify-center">
          <div className="flex gap-4">
          <h2 className="text-secondary-300">Objetivo: </h2>
          <p className="xl:pb-6 xl:text-xl text-sm">{project.objetivo}</p></div>
          {
            <ul className="grid grid-cols-2 gap-2 xl:grid-cols-4 text-xs">
              {project.objetivos.map((obj) =>

                <li className="flex h-12 w-36 bg-primary-500/20 rounded-md py-2 px-0 sm:px-8 justify-center items-center" key={obj}><span className="text-center">{obj} </span></li>
              )}
            </ul>
          }
        </div>
      </section>

      <article className="">

        {project.technologies.frontend && <TechsSection techs={project.technologies.frontend} sectionTitle="Frontend"/>}
        {project.technologies.backend && <TechsSection techs={project.technologies.backend} sectionTitle="Backend"/>}

      </article>
      <Link href="/projects" className="px-8 mt-8 py-2 border-primary-200/80 hover:bg-primary-500/20 hover:border-primary-300 border-4 rounded-md bg-primary-700 ">Volver a la página de proyectos</Link>

    </main>)
}