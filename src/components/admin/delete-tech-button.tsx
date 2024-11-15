"use client"

import { protAdmAct as adminOnlyAction } from "@/actions/auth";
import { deleteTech } from "@/actions/techs/delete";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { FaSpinner } from "react-icons/fa";


type DeleteTechButtonProps = {
  name: string;
  onError: (error: string) => void;
  isAdmin: boolean;
}

const DeleteTechButton: React.FC<DeleteTechButtonProps> = ({ isAdmin, name, onError }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  // console.log("isAdmin delete admin tech: ", isAdmin)
  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (!isAdmin) {
        onError(`Administrador no válido`)
        return alert("Only admin can do")
      }
      else {
        const response = await adminOnlyAction()
        if (response) {
          const res = await deleteTech(name);
          console.log("Deleted:", res);
          if (res) {
            onError(`Eliminación de ${name} completada.`);
          } else {
            onError(`No se pudo eliminar ${name}`);
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al eliminar tech', error.message);
        onError(error.message);
      } else {
        console.error('Error al eliminar tech', error);
        onError("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Button variant={"destructive"} className="">
          <FaSpinner width={6} height={6} color="red" />
        </Button>
      ) : (

        <TooltipProvider>
          <Tooltip>

            <TooltipTrigger asChild>
              <Button variant={"ghost"} onClick={handleClick}><Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Delete {name}</span></Button>
            </TooltipTrigger>
            <TooltipContent className="bg-transparent border-none p-0">
              <Button style={{ cursor: !isAdmin ? "not-allowed" : "pointer" }} variant={"destructive"} disabled={!isAdmin} type="submit">{isAdmin ? `Eliminar ${name}` : "Solo Admin"}</Button>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      )}
    </>
  );
};

export default DeleteTechButton;