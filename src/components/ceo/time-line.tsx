import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";


export type DataTimeLine = {
    id: string
    title: string
    desc: string
    subtitle: string
    date: string
    web?: string
    badges?: string[] // Para poder crear los links de los badges necesitamos
    // badges?: [PreTechBase, ...Array<PreTechBase[]>] // Para poder crear los links de los badges necesitamos
}

type TimeLineProps = {
    arrData: DataTimeLine[]
    classNameMain?: string

}

const TimeLine = ({arrData, classNameMain}: TimeLineProps) => {
    return (
        <div className={cn(classNameMain,"flex flex-col justify-center divide-y divide-slate-200 w-full max-w-3xl md:pb-10")}>
                <div className="-my-6">
                    {arrData.map((data) => {
                        const {id, title, desc, subtitle, date, web, badges} = data
                        return(
                        <div key={id} className="relative py-6 pl-8 sm:pl-32 group">
                            <h3 className="mb-1 text-2xl font-bold sm:mb-0" tabIndex={0}>{title}</h3>
                            <div className="flex flex-col sm:flex-row items-start mb-1 
                                        group-last:before:hidden before:absolute 
                                        before:left-2 sm:before:left-0 before:h-full
                                        before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] 
                                        before:self-start before:-translate-x-1/2 
                                        before:translate-y-3 after:absolute after:left-2 
                                        sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 
                                        after:border-4 after:box-content after:border-slate-50 
                                        after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 
                                        after:translate-y-1.5">
                                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-primary-ceo-200 bg-secondary-ceo-700 rounded-full" tabIndex={0}>{date}</time>
                                <Link href={web?web:"#"} className="text-xl font-bold text-gray-400">{subtitle}</Link>
                            </div>
                            {badges&&<div className="flex gap-2 items-center flex-wrap">{badges.map(badge=>(
                                <Badge key={badge}>{badge}</Badge>
                            ))}</div>}
                            <div className="text-slate-400 w-5/6">{desc}
                            </div>
                        </div>
                    )})}
                </div>
        </div>
    );
}

export default TimeLine;

