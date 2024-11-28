import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import {defineConfig, defineCollection, s}from "velite";



const computedFields = <T extends {slug: string}>(data: T)=>({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/")
})
// const about = defineCollection({
//     name: "About",
//     pattern: "about/**/*.md", // Cambia el patrón a la carpeta donde guardas tus archivos `.md`
//     schema: s.object({
//         slug: s.path(), // Obtiene el slug del archivo
//         body: s.markdown() // Utiliza `s.markdown` para contenido plano en Markdown
//     }).transform(computedFields)
// });


const ejercicios = defineCollection({
    name: "Ejercicio",
    pattern: "ejercicios/**/*.mdx",
    schema: s.object({
        slug: s.path(),
        title: s.string().max(99),
        description: s.string().max(999).optional(),
        date: s.isodate(),
        published: s.boolean().default(true),
        tags: s.array(s.string()).optional(),
        body: s.mdx()
    })
    .transform(computedFields)
})

export default defineConfig({
    root: "content",
    output: {
        data: ".velite",
        assets: "public/static",
        base: "/static/",
        name: "[name]-[hash:6].[ext]",
        clean: true
    },
    collections: {
        ejercicios
        // about
    },
    mdx: {
        
        rehypePlugins: [rehypeSlug,[rehypePrettyCode, {theme: "github-dark"}],[rehypeAutolinkHeadings, { behavior: "wrap",properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
        }}]],
        remarkPlugins: []
    },
})