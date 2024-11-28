
import {ejercicios} from "#site/content"
import { notFound } from "next/navigation"

import "./mdx.css"
import { Metadata } from "next"
import { siteConfigMain as siteConfig } from "@/config/site"
import { Tag } from "@/components/academia/tag"
import { MDXContent } from "@/components/academia/mdx-components"

interface PostPageProps{
    params: Promise<{
        slug: string[]
    }>
}



export async function generateMetadata({params}: PostPageProps): Promise<Metadata> {
    const sP = await params;
    const slug = sP.slug.join("/")
    const post = ejercicios.find(post => post.slugAsParams === slug)
    if(!post){
        return {}
    }
    const ogSearchParams = new URLSearchParams();
    ogSearchParams.set("title", post.title)

    return {
        title: post.title,
        description: post.description,
        authors: {name: siteConfig.author},
        openGraph:{
            title: post.title,
            description: post.description,
            type: "article",
            url: post.slug,
            images:[
                {
                    url: `/api/og?${ogSearchParams.toString()}`,
                    width: 1200,
                    height: 600,
                    alt: post.title,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [`/api/og?${ogSearchParams.toString()}`]
        }
    }
}



export default async function PostPage(props: PostPageProps) {
    const sP = await props.params;
    const slug = sP.slug.join("/")
    const post = ejercicios.find(post => post.slugAsParams === slug)
    if(!post || !post.published){
        notFound()
    }



    return <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
        <h1 className="mb-2">{post.title}</h1>
        <div className="flex gap-2 mb-2">
            {post.tags?.map(tag=><Tag tag={tag} key={tag}/>)}
        </div>
        {post.description ? <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>:null}
        <hr className="my-4" />
        <MDXContent code={post.body}/>
    </article>
}
