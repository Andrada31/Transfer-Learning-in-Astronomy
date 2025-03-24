import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <div
        className="h-full bg-[#6c88da] transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }
