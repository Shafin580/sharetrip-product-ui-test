import Image from "next/image"
import workInProgress from "./work-in-progress.svg"
import { cn } from "tailwind-cn"

const WorkInProgressCard = ({
  className,
  text,
  image,
}: {
  className?: string
  text?: {
    className?: string
    value?: string
  }
  image?: {
    className?: string
    src?: string
    width?: number
    height?: number
  } | null
}) => {
  const mergedTextProps = {
    value: "Work in progress, please check back later.",
    ...text,
  }

  const mergedImageProps = {
    src: workInProgress,
    width: 60,
    height: 40,
    priority: true,
    ...image,
  } as const

  return (
    <div
      className={cn(
        "flex grow flex-col flex-wrap items-center justify-center space-y-16 rounded border px-12 py-16 shadow-sm",
        className
      )}
    >
      {image !== null && (
        <Image alt="error" className={cn("grayscale", mergedImageProps?.className)} {...mergedImageProps} />
      )}
      <p className={cn("text-sm text-slate-500", mergedTextProps.className)}>{mergedTextProps.value}</p>
    </div>
  )
}

export default WorkInProgressCard
