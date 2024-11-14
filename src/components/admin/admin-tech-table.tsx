'use client'

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Plus } from 'lucide-react'
import Link from "next/link"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import DeleteTechButton from "./delete-tech-button"
import { TechDialog } from "./tech-form-2"
import { FrameworksDispo, FullTechData, LenguajesDispo } from "@/lib/types"

// type TechData = {
//   name: string
//   img: string
//   afinidad: number
//   experiencia: number
//   color: string
// }

// const mockData: TechData[] = [
//   { name: "JavaScript", img: "/placeholder.svg?height=40&width=40", afinidad: 90, experiencia: 80, color: "F7DF1E" },
//   { name: "React", img: "/placeholder.svg?height=40&width=40", afinidad: 85, experiencia: 75, color: "61DAFB" },
//   { name: "Node.js", img: "/placeholder.svg?height=40&width=40", afinidad: 80, experiencia: 70, color: "339933" },
//   { name: "TypeScript", img: "/placeholder.svg?height=40&width=40", afinidad: 75, experiencia: 65, color: "3178C6" },
//   { name: "Python", img: "/placeholder.svg?height=40&width=40", afinidad: 70, experiencia: 60, color: "3776AB" },
//   { name: "Docker", img: "/placeholder.svg?height=40&width=40", afinidad: 65, experiencia: 55, color: "2496ED" },
// ]
// - [ ] Falta mostrar el error del delete, y mejorar...
// - [ ] Falta terminar la parte del mobile
type AdminTechTableProps = {
    lenguajes: FullTechData[];
    isAdmin: boolean;  
    dispo: {
      dispoLeng: LenguajesDispo[]
      dispoFw: FrameworksDispo[]
    }
  }
const renderButtonNew = 
<Button className="w-full sm:w-auto gap-2">
<Plus className="h-4 w-4" />
Añadir nueva tecnología
</Button>
export default function AdminTechTable({ lenguajes, isAdmin, dispo }: AdminTechTableProps) {
  const {dispoLeng, dispoFw} = dispo
  const [page, setPage] = useState(1)
  const rowsPerPage = 3
  const totalPages = Math.ceil(lenguajes.length / rowsPerPage)
  const [error, setError] = useState<string | null>(null);

  const paginatedData = lenguajes.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 bg-background z-10 py-4">
        {/* <Button variant="outline" className="w-full sm:w-auto gap-2">
          <LogIn className="h-4 w-4" />
          Sign in -otro boton-
        </Button> 
        
        <Button variant="outline">Añadir nueva tecnología</Button>
        */}
        <TechDialog dispoLeng={dispoLeng} dispoFw={dispoFw} renderButton={renderButtonNew} />
      </div>

      {/* Desktop view */}
      <div className="rounded-md border bg-card hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Afinidad</TableHead>
              <TableHead>Experiencia</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((tech) => (
              <TableRow key={tech.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={tech.img} alt={tech.name} />
                      <AvatarFallback>{tech.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{tech.name}</span>
                  </div>
                </TableCell>
                <TableCell>{tech.afinidad}</TableCell>
                <TableCell>{tech.experiencia}</TableCell>
                <TableCell>
                  <Badge 
                    style={{ 
                      backgroundColor: `#${tech.color}`,
                      color: parseInt(tech.color, 16) > 0xffffff / 2 ? '#000' : '#fff'
                    }}
                  >
                    {tech.color}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/techs/${tech.name}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit {tech.name}</span>
                      </Link>
                    </Button>
                    <DeleteTechButton isAdmin={isAdmin} name={tech.name} onError={(error) => setError(error)}/>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="space-y-4 sm:hidden">
        {paginatedData.map((tech) => (
          <Card key={tech.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={tech.img} alt={tech.name} />
                    <AvatarFallback>{tech.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{tech.name}</span>
                </div>
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/techs/${tech.name}`}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit {tech.name}</span>
                  </Link>
                </Button>
                <DeleteTechButton isAdmin={isAdmin} name={tech.name} onError={(error) => setError(error)}/>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p>Afinidad: {tech.afinidad}</p>
                <p>Experiencia: {tech.experiencia}</p>
                <div className="inline">
                  Color: 
                  <Badge 
                    style={{ 
                      backgroundColor: `#${tech.color}`,
                      color: parseInt(tech.color, 16) > 0xffffff / 2 ? '#000' : '#fff'
                    }}
                    className="ml-2"
                  >
                    {tech.color}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-0 bg-background py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (page > 1) setPage(p => p - 1)
                }}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i} className="hidden sm:inline-block">
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    setPage(i + 1)
                  }}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (page < totalPages) setPage(p => p + 1)
                }}
                aria-disabled={page === totalPages}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}