"use client"
import { Button } from "../ui/button"
import { updatePreTech } from "@/actions/pre-tech"

export const TestAction = () => {
    return (
        <div>
            <Button onClick={
             async ()=>{
                await updatePreTech()
             }
            }>Test Action</Button>
        </div>
    )
}