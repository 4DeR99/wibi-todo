import { cn } from '@/lib/utils'
import React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'w-full border-none p-[15px] focus:outline-none rounded-[15px] bg-light-grey',
        className,
      )}
      {...props}
    />
  )
}
