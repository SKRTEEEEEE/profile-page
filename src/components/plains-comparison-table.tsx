
import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const features = [
  
  {
    name: "Acceso a cursos 'gratuito'",
    description: "Acceso a todo el contenido de la categoría 'Gratuito', incluyendo a los cursos completos, con ejercicios y explicaciones detalladas.",
    free: true,
    standard: true,
    premium: true,
  },
  {
    name: "Acceso a ejercicios 'gratuito'",
    description: "Acceso a todo el contenido de la categoría 'Gratuito', incluyendo ejercicios prácticos para reforzar el aprendizaje de los cursos y mejorar habilidades.",
    free: true,
    standard: true,
    premium: true,
  },

  {
    name: "Recursos de aprendizaje",
    description: "Los mejores recursos imprescindibles para mejorar tus skills.",
    free: true,
    standard: true,
    premium: true,
  },
  {
    name: "Acceso a cursos 'básico'",
    description: "Acceso a todo el contenido de la categoría 'Básico', donde encontraras los mejores cursos completos, con ejercicios y explicaciones detalladas. Incluye multiples cursos de especialidad.",
    free: false,
    standard: true,
    premium: true,
  },
  {
    name: "Acceso a ejercicios 'básico'",
    description: "Acceso a todo el contenido de la categoría 'Básico', donde encontraras los mejores ejercicios para mejorar tus habilidades en tecnologías concretas. Incluye cursos de especialidad.",
    free: false,
    standard: true,
    premium: true,
  },
  {
    name: "Descuentos exclusivos",
    description: "Beneficiate de acceso a descuentos exclusivos de la comunidad en muchos artículos y servicios.",
    free: false,
    standard: true,
    premium: true,
  },
  {
    name: "Acceso a foros exclusivos",
    description: "Beneficiate de acceso a foros exclusivos de la comunidad con los debates mas interesantes.",
    free: false,
    standard: true,
    premium: true,
  },
  {
    name: "Recursos de aprendizaje exclusivos",
    description: "Beneficiate de acceso a nuestra cuidadosa selección de recursos y herramientas necesarias las cuales podrás utilizar de forma gratuita.",
    free: false,
    standard: true,
    premium: true,
  },
  {
    name: "Acceso a cursos 'premium'",
    description: "Acceso a todo el contenido de la categoría 'Premium', donde encontraras los mejores cursos completos, con ejercicios y explicaciones detalladas.",
    free: false,
    standard: false,
    premium: true,
  },
  {
    name: "Acceso a ejercicios 'premium'",
    description: "Acceso a todo el contenido de la categoría 'Premium', donde encontraras los mejores ejercicios para mejorar tus habilidades en tecnologías concretas.",
    free: false,
    standard: false,
    premium: true,
  },
  {
    name: "Descarga de contenido offline",
    description: "Descarga el contenido para poder utilizarlo cuando no tengas conexión a internet.",
    free: false,
    standard: false,
    premium: true,
  },
  {
    name: "Voto de elección",
    description: "Elije los siguientes cursos que se realizaran para la aplicación.",
    free: false,
    standard: false,
    premium: true,
  },
  {
    name: "Soporte",
    description: "Asistencia técnica y ayuda con dudas sobre el contenido del curso.",
    free: "Foro",
    standard: "Email",
    premium: "24/7",
  },
]

function FeatureDialog({ feature }: { feature: typeof features[number] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Info className="h-4 w-4" />
          <span className="sr-only">Más información sobre {feature.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{feature.name}</DialogTitle>
          <DialogDescription>{feature.description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default function PlainsComparisonTable() {
  return (
    <div className="mx-auto py-16">
      <h2 id="comparacion" className="text-2xl font-bold text-center mb-6">Comparación de Planes</h2>
      <Table className="text-xs sm:text-base">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px] xl:w-[400px] md:w-[350px]">Característica</TableHead>
            <TableHead><span className="hidden sm:inline">Plan</span> Gratuito</TableHead>
            <TableHead><span className="hidden sm:inline">Plan</span> Estándar</TableHead>
            <TableHead><span className="hidden sm:inline">Plan</span> Premium</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">
                {feature.name}
                <FeatureDialog feature={feature} />
              </TableCell>
              <TableCell>{feature.free === true ? "✓" : feature.free === false ? "✗" : feature.free}</TableCell>
              <TableCell>{feature.standard === true ? "✓" : feature.standard === false ? "✗" : feature.standard}</TableCell>
              <TableCell>{feature.premium === true ? "✓" : feature.premium === false ? "✗" : feature.premium}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}