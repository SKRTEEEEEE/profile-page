
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
    name: "Acceso a cursos básicos",
    description: "Incluye todos los cursos fundamentales para principiantes en programación.",
    free: true,
    standard: true,
    premium: true,
  },
  {
    name: "Ejercicios diarios",
    description: "Ejercicios prácticos para reforzar el aprendizaje y mejorar habilidades.",
    free: "5 por día",
    standard: "Ilimitados",
    premium: "Ilimitados",
  },
  {
    name: "Soporte",
    description: "Asistencia técnica y ayuda con dudas sobre el contenido del curso.",
    free: "Foro comunitario",
    standard: "Email",
    premium: "Prioritario 24/7",
  },
  {
    name: "Proyectos prácticos",
    description: "Proyectos reales para aplicar los conocimientos adquiridos.",
    free: false,
    standard: "Mensuales",
    premium: "Semanales",
  },
  {
    name: "Certificaciones",
    description: "Certificados oficiales al completar cursos y proyectos específicos.",
    free: false,
    standard: "Básicas",
    premium: "Avanzadas y reconocidas por la industria",
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
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Comparación de Planes</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px] xl:w-[400px] md:w-[350px]">Característica</TableHead>
            <TableHead>Plan Gratuito</TableHead>
            <TableHead>Plan Estándar</TableHead>
            <TableHead>Plan Premium</TableHead>
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