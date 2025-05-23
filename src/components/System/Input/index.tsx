import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const inputVariants = cva(
  'w-full border-none focus:outline-none rounded-[15px] bg-light-grey',
  {
    variants: {
      variant: {
        default: 'px-5 py-3',
        login: 'p-[15px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = ({ className, variant, ...props }: InputProps) => {
  return (
    <input
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}
