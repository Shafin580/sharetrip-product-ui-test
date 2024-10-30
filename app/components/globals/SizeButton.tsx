import { cn } from "@/libs/utils"
import { Button } from "@shad/button"

interface SizeButtonProps {
  size?: string
  key?: number
  className?: string
  onClick?: () => void
}

export default function SizeButton({ size, key, className, onClick }: SizeButtonProps) {
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      key={key}
      className={cn(
        "flex size-10 grow-0 items-center justify-center rounded-md border border-foreground bg-transparent",
        className
      )}
      onClick={onClick}
    >
      {size}
    </Button>
  )
}
