import * as React from "react"

import { cn } from "@/lib/utils"


const TextHighlight = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
	({ className, ...props }, ref) => (
		<span ref={ref} className={cn("bg-gradient-to-l from-beige-main to-gray-main bg-clip-text text-transparent", className)} {...props} />
	),
)
TextHighlight.displayName = "TextHighlight"


export { TextHighlight }