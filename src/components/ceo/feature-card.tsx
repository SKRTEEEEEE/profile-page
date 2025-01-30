import { KeyProject, TechProject } from "@/core/domain/entities/project";
import { DynamicLucideIcon, LucideIconNames } from "../oth/dyn/dynamic-lucide";
import { CustomBadge } from "./custom-badge"
import { useLocale } from "next-intl";
import { IntlKey } from "@/core/domain/entities/intl";


type FeatureCardProps = {
  title: string
  desc: string
  icon?: React.ReactNode
}

function FeatureCard({ title, desc, icon }: FeatureCardProps) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-purple-800/30 rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl opacity-75" />
      <div className="relative p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm bg-black/20 transition-all duration-300 group-hover:bg-black/30">
        <div className="flex gap-4 ">{icon && <div className="text-purple-400 mb-4">{icon}</div>}
          <h4 className="text-xl font-bold text-purple-100 mb-2">{title}</h4></div>
        <p className="text-purple-200/80 text-xs">{desc}</p>
      </div>
    </div>
  )
}

export type KeyCardProjectProps =  KeyProject

type KeyCardsProjectsProps = {
  techs: TechProject[]
  keys: KeyCardProjectProps[]
}

export function KeyProjectsCards({techs, keys}: KeyCardsProjectsProps ) {
  const locale = useLocale()
  return (
    <span>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-transparent rounded-xl blur-xl" />
        <div className="relative">
          <h3 className="text-2xl font-bold text-purple-100 mb-4">Tecnologías</h3>
          <div className="flex flex-wrap gap-3">
            {techs.map((tech) => (
              <CustomBadge key={tech.nameId}>{tech.nameId}</CustomBadge>
            ))}
          </div>
        </div>
      </div>

      {/* Características Clave -
          - Si funciona bien en mobile, hacer esta parte con swiper                
      */}
      <div>
        <h3 className="text-2xl font-bold text-purple-100 my-6">Características Clave</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keys.map(({icon, title, desc})=> (
            <FeatureCard
            // icon={<Cpu className="w-6 h-6" />}
            key={title[locale as IntlKey]}
            icon={<DynamicLucideIcon iconName={icon.iconName as LucideIconNames} className={icon.className} />}
            title={title[locale as IntlKey]}
            desc={desc[locale as IntlKey]}
          />
          ))}
          {/* <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Seguridad Avanzada"
            description="Implementación de protocolos de seguridad de última generación para proteger datos sensibles."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Tiempo Real"
            description="Actualizaciones instantáneas y sincronización en tiempo real entre todos los usuarios."
          />
          <FeatureCard
            icon={<Workflow className="w-6 h-6" />}
            title="Flujo de Trabajo"
            description="Procesos automatizados y flujos de trabajo personalizables para máxima eficiencia."
          /> */}
        </div>
      </div>
    </span>
  )
}