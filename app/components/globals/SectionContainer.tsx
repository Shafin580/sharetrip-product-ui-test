import React from "react"

interface SectionContainerProps {
  children?: React.ReactNode[] | React.ReactNode
  childrenOrientation?: "row" | "column"
  withPadding?: boolean
  withPaddingX?: boolean
  withPaddingY?: boolean
  backgroundClassName?: string
  className?: string
  backgroundImageUrl?: string
  id?: string
  noContainer?: boolean
  layoutAlign?: "center" | "start" | "end"
}

function SectionContainer({
  children,
  childrenOrientation = "row",
  className = "",
  withPadding,
  withPaddingX,
  withPaddingY,
  backgroundClassName = "",
  backgroundImageUrl = "",
  id = "",
  noContainer = false,
  layoutAlign = "center",
}: SectionContainerProps) {
  const paddingClasses = withPadding
    ? "py-10 sm:py-20 lg:py-[80px]" // Adjust padding values as needed
    : withPaddingX
    ? ""
    : withPaddingY
    ? "py-10 sm:py-20 lg:py-[80px]"
    : ""

  const alignmentClass =
    layoutAlign == "end" ? "justify-end" : layoutAlign == "start" ? "justify-start" : "justify-center"

  const childrenOrientationClass = childrenOrientation == "row" ? "flex" : "flex-col"

  return (
    <div
      id={id}
      className={`bg-cover ${backgroundClassName}`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div
        className={`${
          noContainer ? "" : "container"
        } ${childrenOrientationClass} ${alignmentClass} ${paddingClasses} ${className}`}
      >
        {children}
      </div>
    </div>
  )
}

export default SectionContainer
