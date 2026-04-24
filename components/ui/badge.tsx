import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

export interface BadgeProps extends ButtonHTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "destructive"
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
          {
            default: "bg-primary text-primary-foreground",
            secondary: "bg-secondary text-secondary-foreground",
            outline: "border border-border text-foreground",
            destructive: "bg-destructive text-destructive-foreground",
          }[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"
