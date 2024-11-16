// "ejemplo de componente personalizado"

import { RoleType } from "@/core/domain/entities/Role";
import { userInCookiesUC } from "@/core/interface-adapters/controllers/user";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CalloutProps {
    children?: ReactNode;
    type?: "default"|"warning"|"danger";
    role?: "default"|"verificado"|"student";
}

function CalloutWarning ({type}:{type: "subscrito"|"verificado"})  {
    return <div className="py-6 my-2 items-start rounded-sm border border-l-2 px-4 w-full border-destructive bg-destructive/10"> ⚠️ Tienes que estar {type} para ver este contenido</div>
}
function CalloutContainer({ children, type, ...props }: { children: React.ReactNode; type: string; [key: string]: any }) {
    return (
        <div
            className={cn(
                "my-2 items-start rounded-sm border border-l-2 px-2 w-full",
                {
                    "border-destructive bg-destructive/5": type === "danger",
                    "border-yellow-900 bg-yellow-50/5": type === "warning",
                }
            )}
            {...props}
        >
            <div>{children}</div>
        </div>
    );
}

export async function Callout({
    children,
    type= "warning",
    role= "student",
    ...props
}: CalloutProps) {
    const user = await userInCookiesUC()
    if(role==="student"){ 
        if (!user || (user.role !== RoleType["ADMIN"] && user.role !== RoleType["STUDENT"])) {
            
            return <CalloutWarning type="subscrito" />;
        }
        return <CalloutContainer type={type} {...props}>{children}</CalloutContainer>;
    }
    if(role==="verificado"){
        if(!user) return <CalloutWarning type="verificado"/>
        return <CalloutContainer type={type} {...props}>{children}</CalloutContainer>;
    }
    return <CalloutContainer type={type} {...props}>{children}</CalloutContainer>;  
}