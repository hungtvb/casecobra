import { cn } from '@/lib/utils'
import React from 'react'

interface MaxWidthWrapperProps {
    className?: string,
    children: React.ReactNode
}

const MaxWidthWrapper = ({className, children} :MaxWidthWrapperProps) => {
  return (
    <div className={cn("h-full mx-auto max-w-screen-xl px-2.5 md:px-20", className)}>
        {children}
    </div>
  )
}

export default MaxWidthWrapper