'use client'

import { useState } from "react"
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

const plans = [
  {
    name: "Plan Gratuito",
    description: "Perfecto para comenzar",
    price: "$0",
    period: "mes",
    features: [
      "Acceso a cursos básicos",
      "5 ejercicios por día",
      "Foro de la comunidad",
      "Recursos de aprendizaje básicos",
      "Actualizaciones mensuales de contenido",
    ],
  },
  {
    name: "Plan Estándar",
    description: "Ideal para estudiantes dedicados",
    price: "$9.99",
    period: "mes",
    trialPeriod: "Primer mes gratis",
    features: [
      "Todos los cursos básicos y intermedios",
      "Ejercicios ilimitados",
      "Soporte por email",
      "Proyectos prácticos mensuales",
      "Acceso a webinars semanales",
    ],
    extraFeatures: [
      "Descarga de contenido offline",
      "Certificados de finalización",
      "Acceso a la comunidad de estudiantes",
      "Retroalimentación personalizada en proyectos",
    ],
  },
  {
    name: "Plan Premium",
    description: "Para profesionales y expertos",
    price: "$19.99",
    period: "mes",
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
        {plan.trialPeriod && (
          <p className="text-sm text-muted-foreground mt-2">{plan.trialPeriod}</p>
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
        <Button className="w-full">
          {plan.price === "$0" ? "Comenzar Gratis" : plan.trialPeriod ? "Probar Gratis" : "Obtener Premium"}
        </Button>
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
    </div>
  )
}