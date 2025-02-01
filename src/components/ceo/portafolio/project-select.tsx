'use client'

import * as React from 'react'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ProjectSelectPortafolioData = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export type ProjectSelectPortafolioProps = {
  options: {
    projects: ProjectSelectPortafolioData[]
    selectedProject: number
    onProjectSelect: (projectId: number) => void
  }
}

export function ProjectSelectPortafolio({ options }: ProjectSelectPortafolioProps) {
  const {
    projects,
    selectedProject,
    onProjectSelect,
  } = options
  const [open, setOpen] = React.useState(false)
  const currentProject = projects.find(p => p.id === selectedProject.toString())

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[300px] justify-between",
            "bg-black/40 border-purple-500/20 text-purple-100",
            "hover:bg-purple-900/20 hover:border-purple-500/40",
            "backdrop-blur-sm"
          )}
          onClick={() => setOpen(!open)}
        >

          {currentProject?.name}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-dvw sm:w-[600px] p-0",
          "bg-black/80 border-purple-500/20",
          "backdrop-blur-md",
          "animate-in fade-in-0 zoom-in-95",
          "shadow-[0_0_30px_rgba(147,51,234,0.1)]"
        )}
      >
        <div className="flex h-full items-center">
          {/* Imagen estática en la izquierda */}
          <div className="w-[200px] relative border-r sm:inline-block hidden border-purple-500/20">
            <div className="aspect-square relative">
              <Image
                src="/ceo/portafolio-select.png"
                alt="Project Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            {projects.toReversed().map((project, index, array) => (
              <React.Fragment key={project.id}>
                <div
                  onClick={() => {
                    onProjectSelect(Number(project.id))
                    setOpen(false)
                  }}
                  className={cn(
                    "flex items-start gap-3 p-4 cursor-pointer",
                    "transition-colors duration-200",
                    "hover:bg-purple-900/30",
                    selectedProject.toString() === project.id && "bg-purple-900/40"
                  )}
                >
                  <div className="mt-1 text-purple-400">
                    {project.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-purple-100">
                      {project.name}
                    </span>
                    <span className="text-xs text-purple-300/70">
                      {project.description}
                    </span>
                  </div>
                </div>
                {index === array.length - 2 && (
                  <div className="h-px bg-purple-600/30 mx-4"></div>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </PopoverContent>
    </Popover>
  )
}

