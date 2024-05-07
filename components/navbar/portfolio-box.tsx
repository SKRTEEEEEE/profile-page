import Image from "next/image";
import Link from "next/link";

interface PortfolioBoxProps {
    data: {
        id: number
        title: string
        image: string
        urlGithub: string
        urlDemo: string
        operative: boolean
    }
}

const PortfolioBox = (props: PortfolioBoxProps) => {
    const { data } = props
    const { id, title, image, urlDemo, urlGithub, operative } = data

    return (
        <div
            key={id}
            className={operative?"p-4 transition duration-150 rounded-lg bg-secondary/20 hover:bg-secondary/80 border border-teal-50 rounded-xl":"p-4 transition duration-150 rounded-lg bg-black/80 "}
        > <Link
        href={operative?urlDemo:"#"}
        target={operative?"_blank":"_self"}
        
    >
        
    
            <h3 className="mb-4 text-xl">{title}</h3>
            <Image
                src={image}
                alt="Image"
                width={200} height={200} className="w-full md:w-[200px] rounded-2xl h-auto"
            /></Link>

            <div className="flex gap-5 mt-5">      
                {operative ?<Link
                    href={urlGithub}
                    target="_blank"
                    className="p-2 transition duration-150 w-full text-center rounded-lg bg-slate-500 hover:bg-darkBg/80"
                >
                    Github
                </Link>:<Link
                    href={urlGithub}
                    target="_blank"
                    className="p-2 transition duration-150 w-full text-center rounded-lg bg-red-500/50 hover:bg-red-500/20"
                >
                    Working in..
                </Link>  }
            </div>
        </div>
    );
}

export default PortfolioBox
