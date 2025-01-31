import Link from "next/link"
import { GithubIcon } from "lucide-react"
import { Button } from "../ui/button"

export type PortafolioLinksProps = {
    projectTitle: string
    data: {
        web?: string
        webDesc?: string
        github: string
        githubDesc?: string
    }
    buttons: {
        ver: string
        code: string
    }
}

const PortafolioLinks = ({
    projectTitle, data: {web, webDesc, github, githubDesc}, buttons
}: PortafolioLinksProps) => {
    if(webDesc===undefined){
        webDesc = `Dirígete a la pagina web de ${projectTitle}`
    }
    if(githubDesc===undefined)githubDesc=`Dirígete al código del proyecto de ${projectTitle}`

    return(
        <div className={web===undefined?"flex justify-end items-center":` flex justify-between items-center`}>
          {web=== undefined?null:<Link href={web}
            target="__blank"><Button
          variant={"link"}
            aria-description={webDesc}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            
            {buttons.ver} →
          </Button>
          </Link>}

           <Link target="__blank"
            href={github} aria-description={githubDesc}><Button
            variant={"default"}
            
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold flex gap-2"
          >
           <span>{buttons.code} </span><GithubIcon width={12} height={12}/>
          </Button></Link>
        </div>
    )
}

export default PortafolioLinks;