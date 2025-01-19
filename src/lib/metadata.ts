export const metadataMain = {
    name: "SkrtBlog",
    url: "https://profile-skrt.vercel.app/",
    description: "Nextjs 15 profile programmer page",
    author: "Adan Reh",
    links:{
        twitter: "https://x.com/queen420nft",
        github: "https://github.com/SKRTEEEEEE",
        personalSite: "https://profile-skrt.vercel.app/"
    }
}
export const metadataBlog = {
    name: "SkrtBlog",
    url: "https://profile-skrt.vercel.app/es/blog",
    description: "NextJs 15 exercises blog",
    author: "Adan Reh",
    links:{
        twitter: "https://x.com/queen420nft",
        github: "https://github.com/SKRTEEEEEE",
        personalSite: "https://profile-skrt.vercel.app/"
    }
}
export const  metadataAdmin = {
    name: "SkrtAdmin",
    url: "https://blog-next-green-eight.vercel.app/",
    description: "NextJs 14 admin dashboard for the page",
    author: "Adan Reh",
    links:{
        users: "/admin/users",
        twitter: "https://github.com/SKRTEEEEEE",
        idk: "https://profile-skrt.vercel.app/"
    }
}

export type SiteConfigMetadata = {
    name: string;
    url: string;
    description: string;
    author: string;
    links: {
        [key: string]: string;
    };
};