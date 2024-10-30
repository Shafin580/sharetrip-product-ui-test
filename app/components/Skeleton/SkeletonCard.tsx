import { cn } from "@/libs/utils"
import { Card, CardDescription, CardHeader, CardTitle } from "@shad/card"
import React from "react"
import Skeleton from "react-loading-skeleton"

function SkeletonCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn("flex flex-col shadow-2xl shadow-stone-200 duration-150 hover:-translate-y-1", className)}
    >
      <div className="relative h-[12rem] lg:h-[15rem]">
        <Skeleton className="h-full w-full" />
      </div>

      <CardHeader className="flex flex-col space-y-4">
        <CardTitle>
          <Skeleton count={1} />
        </CardTitle>
        <CardDescription className={cn("line-clamp-6 text-foreground")}>
          <Skeleton count={6} />
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default SkeletonCard
