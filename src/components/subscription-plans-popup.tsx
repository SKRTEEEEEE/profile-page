
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PlainsComparisonTable from "./plains-comparison-table"

const plans = [
  {
    name: "Plan Gratuito",
    description: "Perfecto para comenzar",
    price: "0€",
    period: "mes",
    subtitle: "🎉 Subscribe para comenzar !",
    features: [
      "Acceso a cursos completos",
      "Acceso a multiples ejercicios",
      "Foro de la comunidad",
      "Recursos de aprendizaje básicos",
      "Actualizaciones mensuales de contenido",
    ],
  },
  {
    name: "Plan Básico",
    description: "Ideal para estudiantes dedicados",
    price: "9.99€",
    period: "mes",
    subtitle: "💶 Ahora, primer mes GRATIS !",
    features: [
      "Todos lo incluido en el Plan Gratuito",
      "Acceso a cursos exclusivos",
      "Acceso a ejercicios exclusivos",
      "Soporte por email",
      "Proyectos prácticos mensuales",
      "Acceso a webinars semanales",
    ],
    extraFeatures: [
      "Descarga de contenido offline",
      "Certificados de finalización",
      "Acceso a los grupos de estudiantes",
      "Retroalimentación personalizada en proyectos",
    ],
  },
  {
    name: "Plan Premium",
    description: "Para profesionales y expertos",
    price: "19.99€",
    period: "mes",
    subtitle: "🧰 Primer mes, solo 10€ !",
    features: [
      "Acceso completo a todos los cursos",
      "Ejercicios avanzados y proyectos",
      "Soporte prioritario 24/7",
      "Certificaciones reconocidas por la industria",
      "Mentorías personalizadas mensuales",
    ],
    extraFeatures: [
      "Acceso anticipado a nuevos cursos",
      "Descuentos en eventos y conferencias",
      "Networking con expertos de la industria",
      "Herramientas de desarrollo premium",
      "Análisis personalizado de progreso",
      "Oportunidades de empleo exclusivas",
      "Workshops mensuales con expertos",
    ],
  },
]

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center">
          <Check className="mr-2 h-4 w-4 text-green-500" />
          {feature}
        </li>
      ))}
    </ul>
  )
}
function FreePlainButton(){
  return(
    <Button className="w-full">Comenzar Gratis</Button>
  )
}
function BasePlainButton(){
  return(
    <Button className="w-full">Probar Gratis</Button>
  )
}
function PremiumPlainButton(){
  return(
    <Button className="w-full">Obtener Premium</Button>
  )
}

function PlanCard({ plan }: { plan: typeof plans[number] }) {
  return (
    <Card className="w-full flex flex-col">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-4xl font-bold">
          {plan.price}
          <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
        </p>
        {plan.subtitle && (
          <p className="text-sm text-muted-foreground mt-2">{plan.subtitle}</p>
        )}
        <FeatureList features={plan.features.slice(0, 3)} />
        {(plan.features.length > 3 || plan.extraFeatures) && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="mt-2 p-0 h-auto font-normal">
                Ver más características
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{plan.name} - Todas las características</DialogTitle>
                <DialogDescription>
                  Lista completa de características para el {plan.name.toLowerCase()}.
                </DialogDescription>
              </DialogHeader>
              <FeatureList features={plan.features} />
              {plan.extraFeatures && (
                <>
                  <h4 className="font-semibold mt-4">Características adicionales:</h4>
                  <FeatureList features={plan.extraFeatures} />
                </>
              )}
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
      <CardFooter>
        
          {plan.price === "0€" ? <FreePlainButton/> : plan.price === "9.99€" ? <BasePlainButton/> : <PremiumPlainButton/>}
       
      </CardFooter>
    </Card>
  )
}

export function SubscriptionPlansPopup() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Planes de Suscripción</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
      <PlainsComparisonTable/>
    </div>
  )
}