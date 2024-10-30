import { cn } from "@/libs/utils"
import Image from "next/image"
import Link from "next/link"

interface CategoryCardRoundedProps {
  categoryName?: string
  categoryImg?: string
  className?: string
  href?: string
}

export default function CategoryCardRounded({
  categoryName = "Oxfords",
  categoryImg = "/img/slide1.png",
  className = "",
  href = "#",
}: CategoryCardRoundedProps) {
  return (
    <Link href={href} className={cn("group/category max-w-max space-y-2 text-center", className)}>
      <div className="relative flex size-24 items-center justify-center overflow-clip rounded-full bg-background">
        <Image
          src={categoryImg}
          alt={categoryName}
          // layout="fill"
          width={"80"}
          height={0}
          objectFit="cover"
          className="transition-transform group-hover/category:scale-110"
        />
      </div>
      <div className="text-foreground group-hover/category:text-primary">{categoryName}</div>
    </Link>
  )
}
