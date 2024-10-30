import { Metadata } from "next"

export const SITE_METADATA: Metadata = {
  title: {
    /**
     * `title.template` can be used to add a prefix or a suffix
     * to title's defined in child route segments
     */
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_TITLE}`,
    /**
     * `title.default` can be used to provide a fallback title
     * to child route segments that don't define a title
     */
    default: `${process.env.NEXT_PUBLIC_SITE_TITLE}`,
  },
  description: "A Next.js starter configured with TypeScript, ESLint, Prettier, Tailwind CSS, and PostCSS",
}
