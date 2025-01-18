"use client";

import { Tabs } from "../ui-ac/tabs";
import { ThreeDCardDemo } from "./card-test";
import PortafolioLinks, { PortafolioLinksProps } from "./porta-links";
import { portafolioExample } from "./porta-example";
import { KeyProjectsCards } from "./feature-card";
import TimeLine from "./time-line";

type ContentLayoutProps = {
    children: React.ReactNode
    title: string
    links?: PortafolioLinksProps["data"]
}

const ContentLayout = ({children, links, title}: ContentLayoutProps) => (
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
        <div className="w-full overflow-auto relative h-full rounded-2xl px-10 md:pt-5 text-xl md:text-4xl font-bold text-white">
            {links!==undefined&&<PortafolioLinks projectTitle={title} data={links}/>}
          {children}
        </div>
    </div>
)

export function TabsDemo() {
  const tabs = [
    {
        title: "Descripción",
        value: "desc",
        content: (
            
          <ContentLayout title={portafolioExample[0].title}>
           
            <ThreeDCardDemo title={portafolioExample[0].title} img={portafolioExample[0].img} imgDesc={portafolioExample[0].img} links={ portafolioExample[0].links} desc={portafolioExample[0].desc}/>
         </ContentLayout>
        ),
      },
    {
      title: "Detalles",
      value: "details",
      content: (
            <ContentLayout title={portafolioExample[0].title} links={portafolioExample[0].links}>
                <KeyProjectsCards techs={portafolioExample[0].techs} keys={portafolioExample[0].keys}/>
              </ContentLayout>
      ),
    },
    {
      title: "Versiones",
      value: "services",
      content: (
        <ContentLayout title={portafolioExample[0].title} links={portafolioExample[0].links}>
            
            <TimeLine arrData={portafolioExample[0].time}/>
         </ContentLayout>
      ),
    },
  ];

  return (
    
    <div className="h-[28rem] sm:h-[32rem] [perspective:1000px]  relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start">
        
      <Tabs tabs={tabs} />

    </div>
  );
}