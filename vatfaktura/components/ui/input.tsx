import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-slate-900/50 border-blue-500/20 text-white h-9 w-full min-w-0 rounded-lg border px-3 py-1 text-base shadow-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-blue-500/50 focus-visible:ring-blue-500/30 focus-visible:ring-[3px] focus-visible:bg-slate-800/80',
        'placeholder:text-blue-300/40 focus-visible:placeholder:text-blue-300/60',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-rose-500/50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
