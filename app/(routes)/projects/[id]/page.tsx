import { dataPortfolio } from "@/data";
import Image from "next/image";
import Link from "next/link";

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
    <main className="min-h-dvh w-dvw flex flex-col px-2 xl:pl-24 items-start justify-center">

      <h1 className="text-3xl">{project.title}</h1>
      <p>{project.description}</p>

      <section className="flex gap-4 rounded-2xl bg-secondary-800 my-2 px-2">

        {/* <p>{project.description}</p> */}
        <div className="w-32 h-32 rounded-full mt-6 border-4 border-primary-800/40 overflow-hidden hidden sm:inline">
          <Image className="w-full h-full object-cover" width={300} height={100} src={project.image} alt={project.title} /></div>
        <div className="py-6">
          <h2 className="">Objetivo: </h2>
          <p className="pb-6">{project.objetivo}</p>
          {
            <ul className="grid grid-cols-2 gap-2 xl:grid-cols-4 text-xs">
              {project.objetivos.map((obj) =>

                <li className="flex h-12 w-48 bg-primary-500/20 rounded-md py-2 px-0 sm:px-8 justify-center items-center" key={obj}><span className="text-center">{obj} </span></li>
              )}
            </ul>
          }
        </div>
      </section>

      <article className="">

        <section>

          <ul>
            <h3 className="text-xl text-primary-400 font-bold">Frontend</h3>
            <div className="grid grid-cols-3 gap-4">

              {project.technologies.frontend?.map((front) => {
                const shouldRenderParagraph = front?.version && front?.version.trim() !== '';
                return (
                  <li className="flex h-14 gap-4 items-center " key={project.id}>

                    {front.icon}
                    <div className="flex flex-col">
                      <span> {front.title} {shouldRenderParagraph && front.version} </span>
                      <span className="text-xs"><i>{front.desc}</i></span>
                    </div>
                  </li>
                )
              })}
            </div></ul></section>
        <section>

          <ul><h3 className="text-xl text-primary-400 font-bold">Backend</h3>
            <div className="grid grid-cols-3 gap-4">

              {project.technologies.backend?.map((back) => {
                const shouldRenderParagraph = back?.version && back?.version.trim() !== '';
                return (
                  <li className="flex h-14 gap-4 items-center " key={project.id}>

                    {back.icon}
                    <div className="flex flex-col">
                      <span> {back.title} {shouldRenderParagraph && back.version} </span>
                      <span className="text-xs"><i>{back.desc}</i></span></div>
                  </li>
                )
              })}
            </div></ul></section>

      </article>
      <Link href="/projects" className="px-8 mt-8 py-2 border-primary-200/80 hover:bg-primary-500/20 hover:border-primary-300 border-4 rounded-md bg-primary-700 ">Volver a la página de proyectos</Link>

    </main>)
}