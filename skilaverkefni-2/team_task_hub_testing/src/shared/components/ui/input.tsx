import * as React from "react"

import { cn } from "../../lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn('border rounded-md px-3 py-2 focus:outline-none focus:ring-2',
        className
      )}
      {...props}
    />
  )
}

export { Input }
