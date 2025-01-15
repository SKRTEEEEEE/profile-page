interface FeatureCardProps {
    title: string
    description: string
    icon?: React.ReactNode
  }
  
  export function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-purple-800/30 rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl opacity-75" />
        <div className="relative p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm bg-black/20 transition-all duration-300 group-hover:bg-black/30">
          <div className="flex gap-4 ">{icon && <div className="text-purple-400 mb-4">{icon}</div>}
          <h4 className="text-xl font-bold text-purple-100 mb-2">{title}</h4></div>
          <p className="text-purple-200/80 text-xs">{description}</p>
        </div>
      </div>
    )
  }
  
  