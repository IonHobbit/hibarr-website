import * as React from "react"

import { cn } from "@/lib/utils"
import InputTitle from "../InputTitle"

function Input({ className, type, title, titleClassName, error, truncateTitle = false, hideTitle = false, hideRequiredAsterisk = false, ...props }: React.ComponentProps<"input"> & { error?: string, truncateTitle?: boolean, titleClassName?: string, hideTitle?: boolean, hideRequiredAsterisk?: boolean }) {
  return (
    <div className={"relative flex flex-col items-start gap-1 w-full"}>
      <InputTitle id={props.id} title={title} truncateTitle={truncateTitle} titleClassName={titleClassName} required={props.required} hideTitle={hideTitle} hideRequiredAsterisk={hideRequiredAsterisk} />
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 border bg-transparent px-3 py-1.5 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm rounded",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}

export { Input }
