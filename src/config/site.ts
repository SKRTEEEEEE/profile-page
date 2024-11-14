export const siteConfigMain = {
    name: "SkrtBlog",
    url: "https://blog-next-green-eight.vercel.app/",
    description: "NextJs 14 exercises blog using velite, tailwind and shadcn",
    author: "Adan Reh",
    links:{
        twitter: "https://x.com/queen420nft",
        github: "https://github.com/SKRTEEEEEE",
        personalSite: "https://profile-skrt.vercel.app/"
    }
}
export const siteConfigAdmin = {
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

export type SiteConfig = {
    name: string;
    url: string;
    description: string;
    author: string;
    links: {
        [key: string]: string;
    };
};