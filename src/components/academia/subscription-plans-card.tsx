
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
import { BasePlainButton, FreePlainButton, PremiumPlainButton } from "../plains-dialog/pay-plans-buttons"
import { plansBasicInfo } from "@/lib/data"



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


export function SubscriptionPlanCard({ plan }: { plan: typeof plansBasicInfo[number] }) {
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
