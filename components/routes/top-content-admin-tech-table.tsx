import { Button } from "@nextui-org/react"
import Link from "next/link";
import { FaPlus } from "react-icons/fa"

const TopContentAdminTechTable = () =>{
    return(
        <div className="">
        <Button className="absolute right-4 bg-foreground text-background" endContent={<FaPlus  />} size="sm">
        <Link href={`techs/new`}>Añadir nueva tecnología</Link>
      </Button></div>
    )
}

export default TopContentAdminTechTable;