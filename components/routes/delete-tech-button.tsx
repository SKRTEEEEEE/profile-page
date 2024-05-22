"use client"

import { deleteTech } from "@/actions/badges";

interface DeleteTechButtonProps {
    name: string;
}

const DeleteTechButton:React.FC<DeleteTechButtonProps> = ({name}) =>{
    return (
        <button onClick={async ()=>{
            await deleteTech(name)
            console.log("deleted")
        }}>Delete {name}</button>
    )
}

export default DeleteTechButton;