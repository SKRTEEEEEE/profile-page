'use client'

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function SubscriptionDialogCompact({buttonTitle}: {buttonTitle?:string}) {
  const [selectedPlan, setSelectedPlan] = useState("free")

  const plans = [
    {
      id: "free",
      name: "Plan Gratuito",
      price: "$0",
      description: "Perfecto para comenzar",
      features: ["Acceso a cursos profesionales", "Acceso a multiples ejercicios", "Soporte comunitario"],
    },
    {
      id: "standard",
      name: "Plan Estándar",
      price: "$9.99",
      description: "Ideal para estudiantes dedicados",
      features: ["Todo lo incluido en el Plan Gratuito", "Recursos de aprendizaje gratuitos/incluidos", "Soporte por email"],
    },
    {
      id: "premium",
      name: "Plan Premium",
      price: "$19.99",
      description: "Para profesionales y expertos",
      features: [
        "Todo lo incluido en el Plan Básico",
        "Acceso a todo el contenido",
        "Soporte prioritario 24/7",
      ],
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonTitle?buttonTitle:"Actualizar Plan"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Elige tu plan</DialogTitle>
          <DialogDescription>
            Selecciona el plan que mejor se adapte a tus necesidades de aprendizaje.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-4">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              <RadioGroupItem
                value={plan.id}
                id={plan.id}
                className="peer sr-only"
                aria-labelledby={`${plan.id}-label`}
              />
              <Label
                htmlFor={plan.id}
                className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex flex-col">
                  <h3 className="font-semibold" id={`${plan.id}-label`}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{plan.price}/mes</p>
                </div>
                {selectedPlan === plan.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </Label>
              {selectedPlan === plan.id && (
                <div className="mt-2 pl-4 text-sm">
                  <p className="mb-2 text-muted-foreground">{plan.description}</p>
                  <ul className="space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
        <Button className="w-full mt-4">Confirmar selección</Button>
        <Button variant={"outline"} className="w-full mt"><Link href="/academia/tarifas#comparacion">Ver todos los detalles</Link></Button>
      </DialogContent>
    </Dialog>
  )
}