import { cn } from "@/libs/utils"
import React, { ReactNode } from "react"

interface SectionProps extends React.ComponentProps<"section"> {
  children: ReactNode
  size?: "sm" | "md" | "lg"
  containerClassName?: string
  className?: string
  // id?: string
  noContainer?: boolean
}

export default function Section({
  children,
  className = "",
  // id = "",
  size = "md",
  noContainer,
  containerClassName,
  ...props
}: SectionProps) {
  return (
    <section
      // id={id}
      className={cn(
        "py-12 lg:py-20",
        size === "sm" && "py-10 lg:py-20",
        size === "lg" && "py-12 lg:py-28",
        containerClassName
      )}
      {...props}
    >
      <div className={cn(noContainer == true ? "" : "container", className)}>{children}</div>
    </section>
  )
}
