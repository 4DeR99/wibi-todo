import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

const buttonVariants = cva(
  'font-medium transition-colors duration-200 ease-in-out w-fit text-lg flex items-center justify-center',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white hover:bg-accent/80',
        attentive: 'bg-light-grey text-main-red hover:bg-red-500/20',
        icon: 'flex items-center justify-center size-[34px] bg-transparent',
      },
      size: {
        sm: 'py-3 px-[15px] rounded-[12px]',
        md: 'py-[15px] px-5',
        lg: 'w-full py-3 rounded-[15px] text-[15px] leading-[1.2]',
        icon: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export const Button = ({
  variant,
  size,
  children,
  className,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading ? <LoaderCircle className="animate-spin size-4" /> : children}
    </button>
  )
}

Button.displayName = 'Button'
