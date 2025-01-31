import AutoplaySliderTechs from "@/components/ceo/autoplay-slider-techs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkLocale } from "@/i18n/routing"
import { getLocale, getTranslations } from "next-intl/server";
import { readProjectByIdUnoptUC } from "@/core/application/usecases/entities/project";
import { IntlKey } from "@/core/domain/entities/intl";
import { KeyProject, TechProject, TypeProject } from "@/core/domain/entities/project";
import { DynamicSimpleIcon, SimpleIconNames } from "@/components/oth/dyn/dynamic-si";

type TechsSectionProps = {
  techs: TechProject[],
  sectionTitle: string,
  locale: IntlKey
}

const TechsSection: React.FC<TechsSectionProps> = ({ techs, sectionTitle, locale }) => (techs.length > 1) ?
  (<span className="flex w-dvw min-h-32 flex-col align-center">

    <h3 className="absolute ml-4 xl:ml-24 text-xl text-primary-ceo-200 font-semibold">{sectionTitle}</h3>
    <AutoplaySliderTechs data={techs} />
  </span>) :
  <span className="flex min-h-32 w-dvw flex-col align-center">

    {
      techs.length === 0 ? <></> :
        <>
          <h3 className="absolute ml-4 xl:ml-24 text-xl text-primary-ceo-200 font-semibold">{sectionTitle}
          </h3>
          {techs?.map((tech) => {
            const shouldRenderParagraph = tech?.version && tech?.version.trim() !== '';
            return (<div key={tech.nameBadge} className="flex mt-8 justify-center align-center">
              {<DynamicSimpleIcon iconName={`Si${tech.nameBadge.at(0)?.toLocaleUpperCase + tech.nameBadge.slice(1)}` as SimpleIconNames} className="w-8 h-8" />}
              <div className="flex flex-col">
                <span> {tech.nameId} {shouldRenderParagraph && tech.version} </span>
                <span className="text-xs"><i>{tech.typeDesc[locale]}</i></span>
              </div>

            </div>)
          }
          )}
        </>
    }

  </span>

export default async function ProjectsDynPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  // const dataPortfolio = await getProjects()
  const t = await getTranslations()
  const locale = await getLocale()
  // const project: any = dataPortfolio.find((item) => item.id == params.id);
  const project = await readProjectByIdUnoptUC(params.id)


  if (!project) {
    return (
      <main className="min-h-dvh w-dvw flex flex-col gap-4 items-center justify-center">
        <div>No se encontró el proyecto</div>
        <Link href="/ceo/proyectos" className="px-8 mt-8 py-2 border-primary-ceo-200/80 hover:bg-primary-ceo-500/20 hover:border-primary-ceo-300 border-4 rounded-md bg-primary-ceo-700 ">Volver a la página de proyectos</Link>
      </main>
    );
  }
  return (
    <main className="min-h-dvh w-dvw flex flex-col items-start justify-center">

      <h1 className="px-4 md:pl-12 xl:pl-24 text-primary-ceo-400 text-semibold text-3xl">{project.title[locale as IntlKey]}</h1>

      <article className="mx-4 md:ml-12 xl:ml-24 2xl:mx-auto flex gap-4 bg-secondary-ceo-800 my-2 px-2  border rounded-sm border-primary-ceo-400/30">

        {/* <p>{project.description}</p> */}
        <div className="w-32 h-32 rounded-full border-4 border-primary-ceo-300/80 xl:mt-6 xl:ml-4 overflow-hidden hidden sm:inline">
          <Image className="w-full h-full object-cover" width={300} height={100} src={project.image!} alt={project.title[locale as IntlKey]} />
        </div>
        <div className="flex flex-col align-center items-center justify-center">

          <p className="xl:p-6 xl:text-base text-sm md:max-w-sm lg:max-w-3xl">{project.desc[locale as IntlKey]}</p>

          <div className="flex gap-4 xl:mb-6">
            <h2 className="text-secondary-ceo-300">{t("ceo.proyectos.id_static.main_objetive")}: </h2>

            {
              <ul className="grid grid-cols-2 gap-2 xl:grid-cols-4 text-xs">
                {project.keys.map((obj: KeyProject) =>

                  // <li className="flex h-12 w-36 bg-primary-ceo-500/20 rounded-md py-2 px-0 sm:px-8 justify-center items-center" key={obj}><span className="text-center">{obj} </span></li>
                  <li className="flex justify-center items-center" key={obj.title[locale as IntlKey]}>
                    <Badge variant={"outline"}>{obj.title[locale as IntlKey]}</Badge>
                  </li>
                )}
              </ul>
            }
          </div>
        </div>
      </article>

      <section className="">

        {project.techs.find(tech => tech.type.some(typ => typ === "frontend")) && <TechsSection techs={project.techs.filter(tech => tech.type.includes(TypeProject.Frontend))} locale={locale as IntlKey} sectionTitle="Frontend" />}
        {project.techs.find(tech => tech.type.some(typ => typ === "backend")) && <TechsSection techs={project.techs.filter(tech => tech.type.includes(TypeProject.Backend))} locale={locale as IntlKey} sectionTitle="Backend" />}

      </section>
      <div className='flex justify-evenly w-dvw md:w-10/12'>
        <LinkLocale className='px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-400/30 hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80' href={`/ceo/proyectos`}>⬅️{t("ceo.proyectos.id_static.buttons.back.0")} <span className="hidden lg:inline mr-4">{t("ceo.proyectos.id_static.buttons.back.1")}</span></LinkLocale>
        {project?.openSource && <Link className='px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-300/50 hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80' href={project.openSource} target='_blank'><span className="hidden xl:inline">{t("ceo.proyectos.id_static.buttons.code.0")} </span>{t("ceo.proyectos.id_static.buttons.code.1")}📄</Link>}
        {project?.operative && <Link className='px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-300/50 hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80' href={project.operative} target='_blank'>{t("ceo.proyectos.id_static.buttons.project.0")} <span className="hidden xl:inline">{t("ceo.proyectos.id_static.buttons.project.1")}</span>🧑‍💻</Link>}

      </div>
      <Image src="/ceo/home-4.png" priority width="300" height="800" className="hidden md:block absolute right-0 xl:right-12 object-cover" alt={t("ceo.images.hero")} />

    </main>)
}