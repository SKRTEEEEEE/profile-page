"use client";

import { Tabs } from "../ui-ac/tabs";
import { ThreeDCardPortafolio } from "./portafolio-3d-card";
import PortafolioLinks, { PortafolioLinksProps } from "./porta-links";
import { DetailsPortafolioArticle } from "./details-portafolio-article";
import TimeLine, { DataTimeLine } from "./time-line";
import { DynamicLucideIcon, LucideIconNames } from "../oth/dyn/dynamic-lucide";
import { useReducer } from "react";
import { Project } from "@/core/domain/entities/project";
import { useLocale, useTranslations } from "next-intl";
import { IntlKey } from "@/core/domain/entities/intl";

type ContentLayoutProps = {
    children: React.ReactNode
    title: string
    links?: PortafolioLinksProps["data"]
    buttons?: {
        ver: string
        code: string
    }
}

const ContentLayout = ({children, links, title, buttons}: ContentLayoutProps) => (
    <div className="w-full relative h-full rounded-2xl">
         <style jsx>{`
        ::-webkit-scrollbar {
            width: 8px; 
        }

        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1); 
        }

        ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.5);
            border-radius: 10px; 
            height: 4px;

        }

        ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.7); /* Color al pasar el mouse */
        }
    `}</style>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-rose-950 to-gray-900">
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-2/3 w-48 h-48 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-3/4 left-1/3 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
        </div>
        
        {/* Content container */}
        <div className="w-full overflow-auto relative h-full rounded-2xl px-10 md:pt-5 font-bold text-white">
            {links!==undefined&&<PortafolioLinks projectTitle={title} data={links} buttons={buttons!}/>}
          {children}
        </div>
    </div>
)
type State = {
  selectedProject: number
  projectData: Project
}

type Action = 
| {type: "SET_SELECTED_PROJECT"; payload: number}



export function TabsPortafolioSection({selectedProjects}: {selectedProjects: Project[]}) {
  const locale = useLocale()
  const t = useTranslations("ceo.proyectos")
  function reducer(state: State, action: Action): State {
    switch(action.type){
      case "SET_SELECTED_PROJECT":
      return{
        ...state,
        selectedProject: action.payload,
        projectData: selectedProjects[action.payload]
      }
    }
  }
  const initialState: State = {
    selectedProject: selectedProjects.length-1,
    projectData: selectedProjects[selectedProjects.length-1]
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const timeLineProps: DataTimeLine[] = state.projectData.time.map((tim, index) => {
    const { title,desc,type,techs, ...rest } = tim; // Excluimos 'title'
    return {
      id: index.toString(),
      title: tim.title[locale as IntlKey], 
      desc: tim.desc[locale as IntlKey],
      subtitle: tim.type.length>1?"fullstack":tim.type[0],
      badges: tim.techs,
      ...rest, 
    };
  });
  const tabs = [
    {
        title: t("desc"),
        value: "desc",
        content: (
            
          <ContentLayout title={state.projectData.title[locale as IntlKey]}>
        < ThreeDCardPortafolio
          options={{
            title:state.projectData.title[locale as IntlKey], 
            img:state.projectData.image || "/ceo/avatar-works.png", 
            imgDesc: `Imagen de muestra del proyecto ${state.projectData.title}`, 
            desc:state.projectData.desc[locale as IntlKey],
            buttons: t.raw("buttons")
          }}
          links={{web: state.projectData.operative || undefined, github: state.projectData.openSource!}} 
        />
      </ContentLayout>
        ),
      },
    {
      title: t("details"),
      value: "details",
      content: (
            <ContentLayout buttons={t.raw("buttons")} title={state.projectData.title[locale as IntlKey]} links={{web: state.projectData.operative || undefined, github: state.projectData.openSource!}}>
                <DetailsPortafolioArticle title={t.raw("keys")} techs={state.projectData.techs} keys={state.projectData.keys}/>
              </ContentLayout>
      ),
    },
    {
      title: t("versions"),
      value: "versions",
      content: (
        <ContentLayout buttons={t.raw("buttons")} title={state.projectData.title[locale as IntlKey]} links={{web: state.projectData.operative || undefined, github: state.projectData.openSource!}}>
            
            <TimeLine arrData={timeLineProps}/>
         </ContentLayout>
      ),
    },
  ]
  const selectorTabs = selectedProjects.map((data, index)=>({id: index.toString(), name: data.title[locale as IntlKey], description: data.lilDesc[locale as IntlKey], icon: <DynamicLucideIcon iconName={data.icon as LucideIconNames}/>}))
  const onProjectSelect =  (index:number)=>dispatch({type: "SET_SELECTED_PROJECT", payload: index})
  const projectSelectOptions = {projects: selectorTabs, selectedProject:state.selectedProject, onProjectSelect}
  return (
    <section className="flex overflow-hidden flex-col justify-center h-dvh w-dvw lg:pt-8">
        

    <div className="h-[24rem] sm:h-[36rem] [perspective:640px] sm:[perspective:1000px]  relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start">
        
      <Tabs key={state.selectedProject} tabs={tabs} projectSelectOptions={projectSelectOptions}/>

    </div></section>
  );
}