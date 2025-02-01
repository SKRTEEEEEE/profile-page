import { KeyProject, TechProject } from "@/core/domain/entities/project";
import { DynamicLucideIcon, LucideIconNames } from "../../oth/dyn/dynamic-lucide";
import { useLocale } from "next-intl";
import { IntlKey } from "@/core/domain/entities/intl";
import { cn } from "@/lib/utils"

interface CustomBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}
type FeatureCardProps = {
  title: string
  desc: string
  icon?: React.ReactNode
}
function CustomBadge({ children, className, ...props }: CustomBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        "bg-purple-900/30 text-purple-200 border border-purple-500/50",
        "shadow-[0_0_15px_rgba(147,51,234,0.1)] backdrop-blur-sm",
        "transition-all duration-300 hover:bg-purple-800/40 hover:border-purple-400/60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
function FeatureCard({ title, desc, icon }: FeatureCardProps) {
  return (
    <div className="group relative ">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-purple-800/30 rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl opacity-75" />
      <div className="relative min-h-[122px] p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm bg-black/20 transition-all duration-300 group-hover:bg-black/30">
        <div className="flex gap-4 ">{icon && <div className="text-purple-400 mb-4">{icon}</div>}
          <h4 className="text-xl font-bold text-purple-100 mb-2">{title}</h4></div>
        <p className="text-purple-200/80 text-xs">{desc}</p>
      </div>
    </div>
  )
}

export type KeyCardProjectProps =  KeyProject

type DetailsArticlePortafolioProps = {
  techs: TechProject[]
  keys: KeyCardProjectProps[]
  title: {
    char: string
    tech: string
  }
}

export function DetailsArticlePortafolio({techs, keys, title}: DetailsArticlePortafolioProps ) {
  const locale = useLocale()
  return (
    <article>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-transparent rounded-xl blur-xl" />
        <div className="relative">
          <h3 className="text-2xl font-bold text-purple-100 mb-4">{title.tech}</h3>
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
        <h3 className="text-2xl font-bold text-purple-100 my-6">{title.char}</h3>
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
        </div>
      </div>
    </article>
  )
}