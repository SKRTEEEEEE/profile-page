import { Ejercicio } from "#site/content";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {slug} from "github-slugger"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// export function validateStringField(value: unknown, fieldName: string): string {
//   if (typeof value !== 'string' || !value) {
//     throw new Error(`Error with ${fieldName}: must be a non-empty string`);
//   }
//   return value;
// }





export function formatDate(input: string | number): string{
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month:"long",
    day: "numeric",
    year: "numeric",
  })
}

export function sortPosts(posts: Array<Ejercicio>){
  return posts.sort((a, b)=>{
    if(a.date>b.date)return -1
    if(a.date<b.date)return 1
    return 0
  })
}

export function getAllTags(posts: Array<Ejercicio>) {
  const tags: Record<string, number> = {}
  posts.forEach(post => {
    if (post.published) {
      post.tags?.forEach(tag => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      })
    }
  })

  return tags;
}

export function sortTagsByCount(tags: Record<string, number>){
  return Object.keys(tags).sort((a, b)=>tags[b]-tags[a])
}

export function getPostsByTagSlug(posts: Array<Ejercicio>, tag: string){
  return posts.filter(post=>{
    if(!post.tags) return false
    const slugifiedTags = post.tags.map(tag => slug(tag))
    return slugifiedTags.includes(tag)
  })
}