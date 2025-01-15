import { cn } from "@/lib/utils"

interface CustomBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CustomBadge({ children, className, ...props }: CustomBadgeProps) {
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

