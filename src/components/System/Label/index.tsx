import { cn } from '@/lib/utils'
import React from 'react'

interface LabelProps {
  className?: string
  children: React.ReactNode
}

export const Label = ({ className, children }: LabelProps) => {
  return (
    <label className={cn('text-sm font-semibold leading-[1]', className)}>
      {children}
    </label>
  )
}

Label.displayName = 'Label'
