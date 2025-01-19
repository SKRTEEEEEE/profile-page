import { creatorData } from "./data"

const getMetadataSection = (options: {name: string, desc:string}) => {
    return {
        name: options.name,
        url: creatorData.profileWebUrl,
        description: options.desc,
        author: "Adan Reh",
        links:{
            twitter: creatorData.twitter,
            github: creatorData.githubUrl,
            personalSite: creatorData.profileWebUrl
        }
    }
}

export const metadataMain = getMetadataSection({name: "SkrtPage",desc: "Nextjs 15 profile programmer page"})
export const metadataBlog = getMetadataSection({name: "SkrtBlog",desc: "NextJs 15 exercises blog"})
export const metadataAdmin = getMetadataSection({name: "SkrtAdmin",desc: "NextJs 15 admin dashboard for the page"})


export type SiteConfigMetadata = {
    name: string;
    url: string;
    description: string;
    author: string;
    links: {
        [key: string]: string;
    };
};