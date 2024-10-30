import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleImageZoom = (element: HTMLElement | null) => {
  const imageZoom = element as HTMLElement | null

  if (imageZoom) {
    // Add mousemove event listener
    imageZoom.addEventListener("mousemove", (event: MouseEvent) => {
      imageZoom.style.setProperty("--display", "block") // Show the zoom effect

      const pointer = {
        x: (event.offsetX * 100) / imageZoom.offsetWidth,
        y: (event.offsetY * 100) / imageZoom.offsetHeight,
      }

      // Set the custom properties for zoom
      imageZoom.style.setProperty("--zoom-x", `${pointer.x}%`)
      imageZoom.style.setProperty("--zoom-y", `${pointer.y}%`)
      const forceReflow = imageZoom.offsetHeight
    })
    // Add mouseout event listener to hide zoom effect when mouse leaves the container
    imageZoom.addEventListener("mouseout", () => {
      imageZoom.style.setProperty("--display", "none") // Hide the zoom effect
    })
  } else {
    console.error('Element with ID "imageZoom" not found.')
  }
}
