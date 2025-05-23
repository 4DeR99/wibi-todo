import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = ({ className, ...props }: TextAreaProps) => {
  return (
    <textarea
      className={cn(
        'w-full border-none focus:outline-none rounded-[15px] p-5 bg-light-grey resize-none',
        className,
      )}
      {...props}
    />
  )
}
